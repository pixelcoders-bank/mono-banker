import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Autenticacion";
import apiClient from "../api/axiosConfig";
import Cookies from "js-cookie";

const Home = () => {
    const [codigo, setCodigo] = useState(`${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
    const navigate = useNavigate();
    const auth = useAuth();

    const handleCrearSala = async (e) => {

        e.preventDefault();

        try {
        const responseSala = await apiClient.post("/juegos/", {
            idHost: Cookies.get("id"),
            codigo: codigo,
            estado: "pausa",
            turno:"0"
          });

          if(responseSala.status !== 201) {
            throw new Error(responseSala.data.message)
          }

          //Guardar id de la sala
          auth.setIdSala(responseSala.data.juego._id)
          Cookies.set("idSala", responseSala.data.juego._id);

          // Agregar al jugador al juego
        const responseJugador = await handleJugador(responseSala.data.juego._id);
         
          if(responseJugador.status !== 201) {
            throw new Error(responseJugador.data.message)
          }

          navigate(`/sala?codigo=${responseSala.data.juego.codigo}`); // Redirigir a la sala creada
        }
        catch (error) {
            console.error(error.message);
            alert("Hubo un error al crear la sala");
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
            throw new Error(responseJugador.data.message)
          }

          return responseJugador;
        }
        catch (error) {
            console.error(error.message);
            alert("Hubo un error al agregar el jugador");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-red-600">MONOPOLY</h1>
                <h2 className="text-lg text-red-500 mb-4">Banquero</h2>
                <hr className="mb-4" />

                

                <button
                    onClick={handleCrearSala}
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


  