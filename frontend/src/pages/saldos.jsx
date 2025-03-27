import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Autenticacion";
import apiClient from "../api/axiosConfig";

const SaldoJugador = () => {
  const navigate = useNavigate();
  const { idSala } = useAuth(); 
  const [saldos, setSaldos] = useState([]);

  useEffect(() => {
    const obtenerSaldos = async () => {
      if (!idSala) {
        console.warn(" No hay idSala disponible.");
        return;
      }

      try {
        
        const response = await apiClient.get(`/jugadores/juego/${idSala}`);
        const data = response.data;

        if (response.status === 200) {
          setSaldos(data.jugadores); // 
          console.error(" Error obteniendo jugadores:", data.mensaje);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    obtenerSaldos();
  }, [idSala]);

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center border border-black">
        <h1 className="text-2xl font-bold text-red-600">MONOPOLY</h1>
        <h2 className="text-lg text-red-500 mb-4">Banquero</h2>
        <hr className="mb-4" />

        <p className="text-black-600 font-bold text-lg mb-2"># Turno</p>
        <p className="text-red-600 font-bold text-lg mb-4">Saldo de cada jugador</p>

        <div className="border border-gray-400 rounded-lg p-4">
          {saldos.length > 0 ? (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-400 ">
                  <th className="p-2 text-red-700">Jugador</th>
                  <th className="p-2 text-red-700">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {saldos.map((jugador) => (
                  <tr key={jugador._id} className="border-b border-gray-300">
                    <td className="p-2 text-gray-900">
                      {jugador.idUsuario?.nombre || "Desconocido"}
                    </td>
                    <td className="p-2 text-gray-900">
                      ${jugador.saldo?.toLocaleString() || "0"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">Cargando jugadores...</p>
          )}
        </div>

        <button
          onClick={() => navigate("/movimientos")}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          ⬅ Volver
        </button>
      </div>
    </div>
  );
};

export default SaldoJugador;
