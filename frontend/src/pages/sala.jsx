import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sala = () => {
    const navigate = useNavigate();
    const [codigo, setCodigo] = useState("");
    const [jugadores, setJugadores] = useState([]);
    const [esHost, setEsHost] = useState(false);

    useEffect(() => {
        // Recuperar el código generado en JuegoCod.jsx
        const codigoGuardado = JSON.parse(localStorage.getItem("codigoPartida"))?.codigo || "";
        const jugadoresGuardados = JSON.parse(localStorage.getItem("jugadores")) || [];
        const hostGuardado = localStorage.getItem("host");

        setCodigo(codigoGuardado);
        setJugadores(jugadoresGuardados);
        
        // El primer jugador es el host
        if (jugadoresGuardados.length === 0) {
            localStorage.setItem("host", "Jugador 1");
            setEsHost(true);
        } else {
            setEsHost(hostGuardado === `Jugador ${jugadoresGuardados.length + 1}`);
        }
    }, []);

    const agregarJugador = () => {
        if (jugadores.length >= 6) {
            alert("Máximo de 6 jugadores alcanzado.");
            return;
        }

        const nuevoJugador = {
            nombre: `Jugador ${jugadores.length + 1}`,
            caja: 1500,
        };

        const nuevaLista = [...jugadores, nuevoJugador];
        setJugadores(nuevaLista);
        localStorage.setItem("jugadores", JSON.stringify(nuevaLista));

        if (nuevaLista.length === 1) {
            localStorage.setItem("host", nuevoJugador.nombre);
            setEsHost(true);
        }
    };

    const iniciarJuego = () => {
        if (jugadores.length < 2) {
            alert("Se necesitan al menos 2 jugadores para iniciar.");
            return;
        }

        alert("¡El juego ha comenzado!");
        navigate("/movimiento");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
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
                        <span>${jugador.caja}</span>
                    </div>
                ))}

                <button
                    onClick={agregarJugador}
                    className="mt-4 bg-black text-white px-4 py-2 rounded-md w-full hover:bg-gray-800"
                >
                    Agregar Jugador
                </button>
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
    );
};

export default Sala;

