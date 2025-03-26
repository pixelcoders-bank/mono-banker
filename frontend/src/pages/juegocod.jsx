import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const JuegoCod = () => {
    const [codigo, setCodigo] = useState("");
    const navigate = useNavigate();

    // Generar un código de sala aleatorio al cargar la página
    useEffect(() => {
        const nuevoCodigo = Math.random().toString(36).substr(2, 6).toUpperCase();
        setCodigo(nuevoCodigo);
        localStorage.setItem("codigoPartida", JSON.stringify({ codigo: nuevoCodigo }));
    }, []);

    const handleIngresar = () => {
        if (codigo.trim()) {
            navigate(`/sala?codigo=${codigo}`); // Redirige a la sala con el código generado
        } else {
            alert("Por favor, ingresa un código válido.");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center border border-black">
                <h1 className="text-2xl font-bold text-red-600">MONOPOLY</h1>
                <h2 className="text-lg text-red-500 mb-4">Banquero</h2>
                <hr className="mb-4 border-gray-400" />

                <h3 className="text-lg font-bold text-red-600">Código de acceso</h3>

                <label className="block text-gray-700 font-medium mt-4">Código de sala:</label>
                <input
                    type="text"
                    value={codigo}
                    readOnly
                    className="w-full p-2 border rounded-lg text-center mb-4 text-black border-black"
                />

                <button
                    onClick={handleIngresar}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                    Ingresar a la sala
                </button>

                {/* Botón de regreso */}
                <button
                    onClick={() => navigate(-1)}
                    className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full"
                >
                    ⬅
                </button>
            </div>
        </div>
    );
};

export default JuegoCod;
