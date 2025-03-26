import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sala = () => {
    const navigate = useNavigate();
    const [codigo, setCodigo] = useState("");
    const [jugadores, setJugadores] = useState([]);

    // Generar un código de juego si no existe
    useEffect(() => {
        let codigoGuardado = localStorage.getItem("codigoJuego");
        let jugadoresGuardados = JSON.parse(localStorage.getItem("jugadores")) || [];

        if (!codigoGuardado) {
            codigoGuardado = Math.random().toString(36).substring(2, 8).toUpperCase();
            localStorage.setItem("codigoJuego", codigoGuardado);
        }

        setCodigo(codigoGuardado);
        setJugadores(jugadoresGuardados);
    }, []);

    // Función para agregar un jugador
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
    };

    // Función para iniciar el juego
    const iniciarJuego = () => {
        if (jugadores.length < 2) {
            alert("Se necesitan al menos 2 jugadores para iniciar.");
            return;
        }

        alert("¡El juego ha comenzado!");
        navigate("/juego"); // Redirigir a la pantalla de juego (ajustar ruta según tu app)
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

            <button
                onClick={iniciarJuego}
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-md w-full max-w-md hover:bg-green-700"
            >
                Iniciar Juego
            </button>
        </div>
    );
};

export default Sala;
