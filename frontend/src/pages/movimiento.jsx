import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Movimiento = () => {
    const [jugador, setJugador] = useState("Jugador 1");
    const [saldo, setSaldo] = useState(1500);
    const [entidad, setEntidad] = useState("");
    const [movimiento, setMovimiento] = useState("");
    const [valor, setValor] = useState("");
    const [mostrarLista, setMostrarLista] = useState(false);

    const navigate = useNavigate();

    const handleMovimiento = (tipo) => {
        setMovimiento(tipo);
    };

    const handleSeleccionEntidad = (nombre) => {
        setEntidad(nombre);
        if (nombre === "J1") {
            setMostrarLista(!mostrarLista); // Solo cambia si se selecciona J1
        } else {
            setMostrarLista(false); // Oculta la lista si se elige otro jugador
        }
    };

    const handleRegistrar = () => {
        if (valor && entidad && movimiento) {
            alert(`Movimiento registrado: ${movimiento} de ${valor} para ${entidad}`);
            setValor(""); 
        } else {
            alert("Por favor, completa todos los campos.");
        }
    };

    const handleBancarrota = () => {
        setSaldo(0);
        alert(`${jugador} ha sido declarado en bancarrota. Su saldo ahora es $0 y su partida ha terminado.`);
        navigate("/home");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center">
                <h1 className="text-2xl font-bold text-red-600">MONOPOLY</h1>
                <h2 className="text-lg text-red-500 mb-4">Banquero</h2>
                <hr className="mb-4" />

                <div className="mb-4">
                    <p className="text-red-600 font-bold">Turno</p>
                    <div className="flex justify-between">
                        <span className="bg-gray-200 px-4 py-2 rounded text-black">{jugador}</span>
                        <span className="bg-gray-200 px-4 py-2 rounded text-black">Saldo: ${saldo}</span>
                    </div>
                </div>

                <p className="text-red-600 font-bold">Movimiento</p>

                {/* Botones de jugadores con lista desplegable */}
                <div className="mb-4 relative">
                    <p className="text-gray-700">Elegir entidad:</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => handleSeleccionEntidad("J1")}
                            className={`w-12 h-12 rounded-full border ${entidad === "J1" ? "bg-gray-300" : "bg-white"}`}
                        >
                            J1
                        </button>
                        <button
                            onClick={() => handleSeleccionEntidad("J2")}
                            className={`w-12 h-12 rounded-full border ${entidad === "J2" ? "bg-gray-300" : "bg-white"}`}
                        >
                            J2
                        </button>
                    </div>

                    {/* Lista desplegable solo para J1 */}
                    {entidad === "J1" && mostrarLista && (
                        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-white border rounded shadow-lg w-40 p-2">
                            <p className="text-gray-700 font-semibold">Opciones de J1:</p>
                            <ul className="text-gray-600">
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">Opción 1</li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">Opción 2</li>
                                <li className="p-2 hover:bg-gray-100 cursor-pointer">Opción 3</li>
                            </ul>
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <p className="text-gray-700">Elegir tipo de movimiento:</p>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => handleMovimiento("cobro")}
                            className={`px-4 py-2 rounded-lg text-white ${movimiento === "cobro" ? "bg-green-600" : "bg-green-500"} hover:bg-green-700`}
                        >
                            Cobro
                        </button>
                        <button
                            onClick={() => handleMovimiento("pago")}
                            className={`px-4 py-2 rounded-lg text-white ${movimiento === "pago" ? "bg-red-600" : "bg-red-500"} hover:bg-red-700`}
                        >
                            Pago
                        </button>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Ingresar valor:</label>
                    <input
                        type="number"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)}
                        placeholder="$ ---"
                        className="w-full p-2 border rounded-lg text-center"
                    />
                </div>

                <button
                    onClick={handleRegistrar}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition mb-4"
                >
                    Registrar
                </button>

                <div className="grid grid-cols-2 gap-2">
                    <button 
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
                        onClick={() => navigate("/home")} 
                    >
                        Terminar turno
                    </button>
                    <button 
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
                        onClick={() => navigate("/saldo_jugador")}
                    >
                        Saldo de jugadores
                    </button>
                    <button 
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
                        onClick={handleBancarrota}
                    >
                        Declarar bancarrota
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white py-2 rounded"
                            onClick={() => navigate("/Historial")}
                    >
                        Historial
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Movimiento;

