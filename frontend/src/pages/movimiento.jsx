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
        if (nombre === "J2") {
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
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-sm px-4">
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center border border-black">
    {/* Encabezado */}
    <h1 className="text-xl font-bold text-red-600">MONOPOLY</h1>
    <h2 className="text-md text-red-500 mb-3">Banquero</h2>
    <hr className="mb-3 border-gray-300" />

    {/* Sección de Turno */}
    <div className="mb-3">
    <p className="text-red-600 font-bold text-sm">Turno</p>
    <div className="flex justify-between text-sm">
        <span className="bg-gray-200 px-3 py-1 rounded text-black">{jugador}</span>
        <span className="bg-gray-200 px-3 py-1 rounded text-black">Saldo: ${saldo}</span>
    </div>
    </div>

    {/* Sección de Movimiento */}
    <p className="text-red-600 font-bold text-sm mb-2">Movimiento</p>

    {/* Selector de Entidad */}
    <div className="mb-3 relative">
  <p className="text-gray-700 text-sm">Entidad:</p>
  <div className="flex justify-center gap-3 mt-1">
    <button
      onClick={() => handleSeleccionEntidad("J1")}
      className={`w-10 h-10 rounded-full border-2 text-sm flex items-center justify-center ${
        entidad === "J1" ? "bg-black text-white" : "bg-black text-white"
      }`}
    >
      J1
    </button>
    <button
      onClick={() => handleSeleccionEntidad("J2")}
      className={`w-10 h-10 rounded-full border-2 text-sm flex items-center justify-center ${
        entidad === "J2" ? "bg-black text-white" : "bg-black text-white"
      }`}
    >
      J2
    </button>
  </div>

      {/* Lista desplegable J1 */}
    {entidad === "J2" && mostrarLista && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-32 z-50 overflow-hidden">
        <p className="text-gray-700 font-semibold px-1">Opciones J2:</p>
        <ul>
        <li className="p-2 hover:bg-gray-200 text-black cursor-pointer">Opción 1</li>
        <li className="p-2 hover:bg-gray-200 text-black cursor-pointer">Opción 2</li>
        </ul>
        </div>
    )}
    </div>

    {/* Tipo de Movimiento */}
    <div className="mb-3">
      <p className="text-gray-700 text-sm">Tipo:</p>
      <div className="flex justify-center gap-3 mt-1">
        <button
          onClick={() => handleMovimiento("cobro")}
          className={`px-3 py-1 rounded text-sm text-white ${movimiento === "cobro" ? "bg-green-600" : "bg-green-500"}`}
        >
          Cobro
        </button>
        <button
          onClick={() => handleMovimiento("pago")}
          className={`px-3 py-1 rounded text-sm text-white ${movimiento === "pago" ? "bg-red-600" : "bg-red-500"}`}
        >
          Pago
        </button>
      </div>
    </div>

    {/* Valor */}
    <div className="mb-3">
      <label className="block text-gray-700 text-sm mb-1">Valor:</label>
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="$ ---"
        className="w-full p-1 border rounded text-center text-sm"
      />
    </div>

    {/* Botón Principal */}
    <button
      onClick={handleRegistrar}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded mb-3"
    >
      Registrar
    </button>

    {/* Botones Secundarios */}
    <div className="grid grid-cols-2 gap-2 text-sm">
      <button 
        className="bg-gray-500 hover:bg-gray-600 text-white py-1 rounded"
        onClick={() => navigate("/home")} 
      >
        Terminar turno
      </button>
      <button 
        className="bg-gray-500 hover:bg-gray-600 text-white py-1 rounded"
        onClick={() => navigate("/saldos")}
      >
        Saldos
      </button>
      <button 
        className="bg-gray-500 hover:bg-gray-600 text-white py-1 rounded"
        onClick={handleBancarrota}
      >
        Bancarrota
      </button>
      <button 
        className="bg-gray-500 hover:bg-gray-600 text-white py-1 rounded"
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

