import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import Cookies from "js-cookie";

const AuthContext = createContext();

const Autenticacion = ({ children }) => {
  const [user, setUser] = useState({
    nombre: Cookies.get("usuario") || "",
    id: Cookies.get("id") || "",
  });
  const [idSala, setIdSala] = useState(
    Cookies.get("idSala") || "");
  const [idJugador, setIdJugador] = useState(Cookies.get("idJugador") || "");
  const [token, setToken] = useState(Cookies.get("session") || "");
  const [banca, setBanca] = useState({});

  const navigate = useNavigate();

  const getBanca = async () => {
    const response = await apiClient.get(`/jugadores/67e37dc5ae146eccd4457849`);
      //ocultar datos innecesarios.
      const bancaClean = {
        idJugador: response.data._id,
        idUsuario: response.data.idUsuario._id,
        nombre: response.data.idUsuario.nombre,
        saldo: response.data.saldo
      };
    setBanca(bancaClean);
  };

  const loginAction = async (usuarioLogin) => {
    const response = await apiClient.post("/usuarios/login", usuarioLogin);
    
  const usuario = response.data.usuario
    if (response.status === 200) {
      setUser({
        nombre: `${usuario.nombre}`,
        id: `${usuario._id}`,
      });

      Cookies.set("id", `${usuario._id}`, { expires: 2 });
      Cookies.set("usuario", `${usuario.nombre}`, { expires: 2 });
      Cookies.set("session", `${true}`, { expires: 2 });

      return navigate("/home");
    }

    throw new Error(response.data.message);
  };

  const logOut = async () => {
    setUser({
        nombre: "",
        id: "",
  
    });
    Cookies.remove("session");
    Cookies.remove("id");
    Cookies.remove("usuario");
    
    navigate("/");
    };
  
  useEffect(() => {
    getBanca();
  }, []);

    return (
        <AuthContext.Provider value={{ user, token, banca, idSala, idJugador, getBanca, setIdJugador, loginAction, logOut, setIdSala }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export default Autenticacion;