import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Autenticacion";
import apiClient from "../api/axiosConfig";

const Historial = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
  

    if (!auth.idSala) {
      console.error("Error: idSala no está definido");
      return;
    }

    const obtenerHistorial = async () => {
      try {
        const response = await apiClient.get(`/transacciones/${auth.idSala}`);
        
        if (!Array.isArray(response.data)) {
          console.error("Error: La respuesta no es un array", response.data);
          return;
        }

        setHistorial(response.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error.message);
      }
    };

    obtenerHistorial();
  }, [auth.idSala]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center border border-black">
        <h1 className="text-2xl font-bold text-red-600">MONOPOLY</h1>
        <h2 className="text-lg text-red-500 mb-4">Banquero</h2>
        <hr className="mb-4 border-gray-400" />

        <h3 className="text-lg font-bold text-black">Historial</h3>

        {/* Tabla del historial con scroll */}
        <div className="mt-4 border border-black rounded-lg p-3 bg-white max-h-60 overflow-y-auto">
          {historial.length > 0 ? (
            historial.map((movimiento, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-t border-black py-2 text-black"
              >
                <span className="font-bold">
                  {movimiento.idRemitente?.idUsuario?.nombre || "Desconocido"}
                </span>
                <span className="bg-gray-200 px-2 py-1 rounded-lg">
                  {movimiento.tipo}
                </span>
                <span className="font-bold">
                  {movimiento.idDestinatario?.idUsuario?.nombre || "Banco"}
                </span>
                <span
                  className={`${
                    movimiento.tipo === "cobro"
                      ? "text-green-600"
                      : "text-red-600"
                  } font-bold`}
                >
                  {movimiento.tipo === "cobro"
                    ? `+${movimiento.monto}`
                    : `-${movimiento.monto}`}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay transacciones registradas.</p>
          )}
        </div>

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

export default Historial;
