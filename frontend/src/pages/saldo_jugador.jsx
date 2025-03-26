import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SaldoJugador = () => {
    const navigate = useNavigate();

    // Estado para manejar los saldos de cada jugador
    const [saldos, setSaldos] = useState({
        J1: 1500,
        J2: 1500,
        J3: 1500,
        J4: 1500
    });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-red-600">MONOPOLY</h1>
                <h2 className="text-lg text-red-500 mb-4">Banquero</h2>
                <hr className="mb-4" />

                <p className="text-black-600 font-bold text-lg mb-2"># Turno</p>
                <p className="text-red-600 font-bold text-lg mb-4">Saldo de cada jugador</p>

                <div className="border border-gray-400 rounded-lg p-4">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-400">
                                <th className="p-2 text-red-700">Jugador</th>
                                <th className="p-2 text-red-700">Saldo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(saldos).map((jugador) => (
                                <tr key={jugador} className="border-b border-gray-300">
                                    <td className="p-2">{jugador}</td>
                                    <td className="p-2">${saldos[jugador]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Botón de volver */}
                <button
                     onClick={() => navigate("/movimiento")}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
                >
                    ⬅ Volver
                </button>
            </div>
        </div>
    );
};

export default SaldoJugador;
