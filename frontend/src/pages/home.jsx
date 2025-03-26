import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate

const Home = () => {
    const [codigo, setCodigo] = useState("");
    const navigate = useNavigate(); // Inicializar useNavigate

    const handleChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleContinuar = () => {
        if (codigo.trim()) {
            alert(`Unido a la sala ${codigo}`);
            navigate(`/sala?codigo=${codigo}`); // Redirigir a la sala con el código
        } else {
            // Crear un nuevo código aleatorio
            const nuevoCodigo = Math.random().toString(36).substr(2, 6).toUpperCase();
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

                

                <button
                    onClick={() => navigate("/sala")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                    Crear sala
                </button>
                
                <br />
                <br />

                <button
                     onClick={() => navigate("/juegocod")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                    Unirse a la sala
                </button>
            </div>
        </div>
    );
};

export default Home;


  