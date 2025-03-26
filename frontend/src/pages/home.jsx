import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const Home = () => {
    const [codigo, setCodigo] = useState("");
    const navigate = useNavigate(); // Inicializar useNavigate

    const handleChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleContinuar = () => {
        let salas = JSON.parse(localStorage.getItem("salas")) || [];

        if (codigo.trim()) {
            // Buscar si la sala existe
            const salaExistente = salas.find((sala) => sala.codigo === codigo);
            if (salaExistente) {
                alert(`Unido a la sala ${codigo}`);
                navigate(`/sala?codigo=${codigo}`); // Redirigir a la sala con el código
            } else {
                alert("Código incorrecto, la sala no existe.");
            }
        } else {
            // Crear una nueva sala
            const nuevoCodigo = Math.random().toString(36).substr(2, 6).toUpperCase();
            salas.push({ codigo: nuevoCodigo });
            localStorage.setItem("salas", JSON.stringify(salas));
            alert(`Nueva sala creada con código: ${nuevoCodigo}`);
            setCodigo(nuevoCodigo);
            navigate(`/sala?codigo=${nuevoCodigo}`); // Redirigir a la sala creada
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-red-600">MONOPOLY</h1>
                <h2 className="text-lg text-red-500 mb-4">Banquero</h2>
                <hr className="mb-4" />

                <p className="text-gray-700 mb-4">
                    Click en continuar para crear una sala de juego o ingresa el código y únete a la sala.
                </p>

                <label className="block text-gray-700 font-medium mb-2">Código del juego:</label>
                <input
                    type="text"
                    value={codigo}
                    onChange={handleChange}
                    placeholder="Ingrese el código"
                    className="w-full p-2 border rounded-lg text-center mb-4 text-black placeholder-black"
                />

                <button
                    onClick={handleContinuar}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                    Continuar
                </button>
            </div>
        </div>
    );
};

export default Home;



  