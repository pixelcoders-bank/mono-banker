import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Autenticacion";
import apiClient from "../api/axiosConfig";
import Cookies from "js-cookie";

const JuegoCod = () => {
    const [codigo, setCodigo] = useState("");
    const navigate = useNavigate();
    const auth = useAuth();

    const handleChange = (e) => {
        setCodigo(e.target.value);
    };

    const handleIngresarSala = async () => {
        try {
            if (!Cookies.get("session")) {
                alert("Debes iniciar sesión para ingresar a una sala.");
                navigate("/");
                return;
            }

            if (codigo.trim()) {
              const responseSala = await apiClient.get(
                `/juegos/codigo/${codigo}`
              );

              if (responseSala.status !== 200) {
                throw new Error(responseSala.data.message);
              }

              const cantidadJugadores = (await apiClient.get(`/jugadores/juego/${responseSala.data.juego._id}`)).data.cantidad
              console.log(cantidadJugadores)

              // Validar la cantidad maxima de jugadores
             if ( cantidadJugadores < 8 ) {
                 await handleJugador(responseSala.data.juego._id); // Agregar al jugador al juego
             } else {
                alert("La sala está llena. Prueba con otra sala.");
                return
             }

              //Guardar id de la sala
              auth.setIdSala(responseSala.data.juego._id);
              Cookies.set("idSala", responseSala.data.juego._id);
              
              navigate(`/sala?codigo=${codigo}`); // Redirige a la sala con el código generado
            } else {
                alert("Por favor, ingresa un código válido.");
            }
        } catch (error) {
            console.error(error.message);
            alert("Hubo un error al agregar el jugador");
        }
        
    };

    const handleJugador = async (idJuego) => {
        try {
            const responseJugador = await apiClient.post("/jugadores/registro", {
                idUsuario: auth.user.id || Cookies.get("id"),
                idJuego,
                saldo: 1500
            });

            
          if(responseJugador.status !== 201) {
            if(responseJugador.status !== 200) {
            throw new Error(responseJugador.data.message)
            }

        //Guardar id del jugador
          auth.setIdJugador(responseJugador.data.jugador._id)
          Cookies.set("idJugador", responseJugador.data.jugador._id);
            
          }
        }
        catch (error) {
            console.error(error.message);
            alert("Hubo un error al agregar el jugador");
        }
    }

    return (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center border border-black">
                <h1 className="text-2xl font-bold text-red-600">MONOPOLY</h1>
                <h2 className="text-lg text-red-500 mb-4">Banquero</h2>
                <hr className="mb-4 border-gray-400" />

                <h3 className="text-lg font-bold text-red-600">Código de acceso</h3>

                <label className="block text-gray-700 font-medium mt-4">Código de sala:</label>
                <input
                    type="text"
                    value={codigo}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg text-center mb-4 text-black border-black"
                />

                <button
                    onClick={handleIngresarSala}
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
