import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Autenticacion";
import apiClient from "../api/axiosConfig";
import Cookies from "js-cookie";

const Sala = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [codigo, setCodigo] = useState("");
    const [jugadores, setJugadores] = useState([]);
    const [esHost, setEsHost] = useState(false);
    const [estadoJuego, setEstadoJuego] = useState("esperando");

    const obtenerDatosSala = async() => {
        try {
            
            //Obtener datos de juego
            const responseSala = await apiClient.get(
            `/juegos/${auth.idSala}`
            );
            if (responseSala.status !== 200) {
            throw new Error(responseSala.data.message);
            }
            setCodigo(responseSala.data.juego.codigo);
            setEstadoJuego(responseSala.data.juego.estado);
            setEsHost(responseSala.data.juego.idHost === auth.user.id);
            
            //Obtener datos de jugador
            const responseJugadores = await apiClient.get(
            `jugadores/juego/${responseSala.data.juego._id}`
            );

            if (responseJugadores.status !== 200) {
            throw new Error(responseJugadores.data.message);
            }

            
            //ocultar datos innecesarios.
            const jugadoresClean = responseJugadores.data.jugadores.map((jugador) => ({
                idJugador: jugador._id,
                idUsuario: jugador.idUsuario._id,
                nombre: jugador.idUsuario.nombre,
                saldo: jugador.saldo
            }));
            setJugadores(jugadoresClean);

        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema al cargar los datos de la sala.");
        }
    };  

    useEffect(() => {
        obtenerDatosSala();

        // Configurar polling 5s
        const intervalo = setInterval(obtenerDatosSala, 5000);

        // Limpiar el intervalo
        return () => clearInterval(intervalo);
    }, []);

    const iniciarJuego = async () => {
        if (jugadores.length < 2) {
          alert("Se necesitan al menos 2 jugadores para iniciar.");
          return;
        }

        const actualizarJuego = await apiClient.put(`/juegos/${auth.idSala}`, {
          estado: "iniciado",
          turnoJugador: auth.user.id,
        });
        if (actualizarJuego.status !== 200) {
          throw new Error(actualizarJuego.data.message);
        }

        alert("¡El juego ha comenzado!");
        navigate("/movimientos");
    };

    useEffect(() => {
        //Si el juego ha comenzado dirige ala vista de movimientos
        if (estadoJuego === "iniciado") {
            alert("¡El juego ha comenzado!");
            navigate("/movimientos");
        }
    }, [estadoJuego]);

    //Abandonar sala

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center border border-black">
            <h1 className="text-3xl font-bold text-red-600">MONOPOLY</h1>
            <p className="text-3xl font-bold text-red-600">Banquero</p>
            <hr className="w-full max-w-md border-gray-300 mb-4" />

            <p className="text-lg font-medium text-black">Código de juego:</p>
            <input
                type="text"
                value={codigo}
                readOnly
                className="w-40 text-center text-xl font-bold bg-gray-200 rounded-md p-2 mb-4 text-black border border-black"
            />

            <p className="text-lg font-medium text-black">Jugadores unidos:</p>
            <div className="bg-white shadow-lg rounded-lg p-4 w-full max-w-md border border-black">
                <div className="flex justify-between font-bold mb-2 text-black">
                    <span>Nombre</span>
                    <span>Caja</span>
                </div>

                {jugadores.map((jugador, index) => (
                    <div key={index} className="flex justify-between border-t border-black py-2 text-black">
                        <span>{jugador.nombre}</span>
                        <span>${jugador.saldo}</span>
                    </div>
                ))}

            </div>

            {/* Mostrar botón solo si es el host */}
            {esHost ? (
                <button
                    onClick={iniciarJuego}
                    className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md w-full max-w-md hover:bg-green-700"
                >
                    Iniciar Juego
                </button>
            ) : (
                <p className="mt-6 text-lg font-medium text-gray-700">Esperando a que el host inicie la partida...</p>
            )}
        </div>
        </div>
    );
};

export default Sala;

