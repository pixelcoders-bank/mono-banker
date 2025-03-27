import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Autenticacion";
import apiClient from "../api/axiosConfig";

const Movimiento = () => {
    const auth = useAuth();
    const [jugador, setJugador] = useState({});
    const [jugadores, setJugadores] = useState([]);
    const [jugadorTurno, setJugadorTurno] = useState({});
    const [saldo, setSaldo] = useState(0);
    const [saldoTurno, setSaldoTurno] = useState(0);
    const [entidad, setEntidad] = useState(auth.banca);
    const [movimiento, setMovimiento] = useState("");
    const [valor, setValor] = useState("");
    const [mostrarLista, setMostrarLista] = useState(false);

    const navigate = useNavigate();

    //Separar
    const obtenerDatosSala = async() => {
      try {
          
          //Obtener datos de juego
          const responseSala = await apiClient.get(
          `/juegos/${auth.idSala}`
          );
          if (responseSala.status !== 200) {
          throw new Error(responseSala.data.message);
          }
          
          //Obtener datos de jugador
          const responseJugadores = await apiClient.get(
          `jugadores/juego/${responseSala.data.juego._id}`
          );

          if (responseJugadores.status !== 200) {
          throw new Error(responseJugadores.data.message);
          }

          
          //ocultar datos innecesarios.
          const jugadoresClean = responseJugadores.data.jugadores.map((jugador) => ({
              idJugador: jugador._id,
              idUsuario: jugador.idUsuario._id,
              nombre: jugador.idUsuario.nombre,
              saldo: jugador.saldo
          }));

          //Seteo de estados
          setJugadores(jugadoresClean);
          setJugador(jugadoresClean.find(jugador => jugador.idUsuario  === auth.user.id ))
          setJugadorTurno(jugadoresClean.find(jugador => jugador.idUsuario === responseSala.data.juego.turnoJugador));
      } catch (error) {
          console.error("Error:", error);
          alert("Hubo un problema al cargar los datos de la sala.");
      }
  };

  useEffect(() => {
      obtenerDatosSala();

      if(!entidad){
        setEntidad(auth.banca)
      }
      // Configurar polling 5s
      const intervalo = setInterval(obtenerDatosSala, 5000);

      // Limpiar el intervalo
      return () => clearInterval(intervalo);
  }, []);

    const handleMovimiento = (tipo) => {
        setMovimiento(tipo);
    };

    const handleSeleccionEntidad = (nombre) => {
        setEntidad(nombre);
        setMostrarLista(false);
    };

    const handleRegistrar = async () => {
        if (valor && entidad && movimiento) {
          try {
          const response = await apiClient.post("/transacciones", {
            idRemitente: jugador.idJugador,
            idDestinatario: entidad.idJugador,
            idJuego: auth.idSala,
            tipo: movimiento,
            monto: parseInt(valor),
            turno: 1
          });

          // Verificar si el correo ya está registrado
          if(response.status !== 201) {
          throw new Error(response.data.message)
          }

          alert(`Movimiento registrado: ${movimiento} de ${valor} para ${entidad}`);

          } catch (err) {

          if (err) {
          alert(
          err.message || "Error extraño registrar el movimiento"
          );
          } else {
          alert("Error al conectar con el servidor");
          }
          }
          
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
        <span className="bg-gray-200 px-3 py-1 rounded text-black">{jugadorTurno.nombre}</span>
        <span className="bg-gray-200 px-3 py-1 rounded text-black">Saldo: ${jugadorTurno.saldo}</span>
    </div>
    </div>

    {/* Sección de Turno */}
    <div className="mb-3">
    <p className="text-red-600 font-bold text-sm">Yo</p>
    <div className="flex justify-between text-sm">
        <span className="bg-gray-200 px-3 py-1 rounded text-black">{jugador.nombre}</span>
        <span className="bg-gray-200 px-3 py-1 rounded text-black">Saldo: ${jugador.saldo}</span>
    </div>
    </div>

    {/* Sección de Movimiento */}
    <p className="text-red-600 font-bold text-sm mb-2">Movimiento</p>

    {/* Selector de Entidad */}
    <div className="mb-3 relative">
  <p className="text-gray-700 text-sm">Entidad:</p>
  <div className="flex justify-center gap-3 mt-1">
    <button
      className={` rounded-full border-2 text-sm flex items-center justify-center bg-black text-white disabled:bg-gray-600`} disabled
    >
      {jugador.nombre}
    </button>
    <button
      onClick={() => setMostrarLista(!mostrarLista)}
      className={`rounded-full border-2 text-sm flex items-center justify-center bg-black text-white  disabled:bg-gray-600`}
      disabled = {jugador.idJugador === jugadorTurno.idJugador? false : true }>
      {entidad.nombre ? entidad.nombre : "Seleccionar"}
    </button>
  </div>

      {/* Lista desplegable J1 */}
    {mostrarLista && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-300 rounded-md shadow-lg w-32 z-50 overflow-hidden">
        <p className="text-gray-700 font-semibold px-1">Opciones:</p>
        <ul>
        <li className="p-2 hover:bg-gray-200 text-black cursor-pointer"
         onClick={() => handleSeleccionEntidad(auth.banca)}>{auth.banca.nombre}</li>
        {jugadores.filter(jugador => jugador.idUsuario  !== auth.user.id).map((jugador) => (
              <li
                key={jugador.idJugador}
                className="p-2 hover:bg-gray-200 text-black cursor-pointer"
                onClick={() => handleSeleccionEntidad(jugador)}
              >
                {jugador.nombre}
              </li>
            ))}
        </ul>
        </div>
    )}
    </div>

    {/* Tipo de Movimiento */}
    <div className="mb-3" >
      <p className="text-gray-700 text-sm">Tipo:</p>
      <div className="flex justify-center gap-3 mt-1">
        <button
          onClick={() => handleMovimiento("cobro")}
          className={`px-3 py-1 rounded text-sm text-white ${movimiento === "cobro" ? "bg-green-900" : "bg-green-500"}  disabled:bg-gray-600`}
          disabled = {jugador.idJugador === jugadorTurno.idJugador? false : true }
        >
          Cobro
        </button>
        <button
          onClick={() => handleMovimiento("pago")}
          className={`px-3 py-1 rounded text-sm text-white ${movimiento === "pago" ? "bg-red-900" : "bg-red-500"}  disabled:bg-gray-600`}
          disabled = {jugador.idJugador === jugadorTurno.idJugador? false : true }
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
        className="w-full px-2 py-1 border border-gray-300 rounded-md text-center text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        disabled = {jugador.idJugador === jugadorTurno.idJugador? false : true }
      />
    </div>

    {/* Botón Principal */}
    <button
      onClick={handleRegistrar}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1 px-3 rounded mb-3  disabled:bg-gray-900"
      disabled = {jugador.idJugador === jugadorTurno.idJugador? false : true }
    >
      Registrar
    </button>

    {/* Botones Secundarios */}
    <div className="grid grid-cols-2 gap-2 text-sm">
      <button 
        className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 rounded"
        onClick={() => navigate("/home")} 
      >
        Terminar turno
      </button>
      <button 
        className="bg-blue-800 hover:bg-blue-600 text-white py-1 rounded"
        onClick={() => navigate("/saldos")}
      >
        Saldos
      </button>
      <button 
        className="bg-red-800 hover:bg-red-900 text-white py-1 rounded"
        onClick={handleBancarrota}
      >
        Bancarrota
      </button>
      <button 
        className="bg-blue-800 hover:bg-blue-600 text-white py-1 rounded"
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

