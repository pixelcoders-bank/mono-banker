import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axiosConfig";
import Cookies from "js-cookie";

const AuthContext = createContext();

const Autenticacion = ({ children }) => {
  const [user, setUser] = useState({
    nombre: Cookies.get("nombre") || "",
    id: Cookies.get("id") || "",
  });

  const [token, setToken] = useState(Cookies.get("session") || "");

  const navigate = useNavigate();

  const loginAction = async (usuarioLogin) => {
    const response = await apiClient.post("/usuarios/login", usuarioLogin);
    
    const usuario = response.data.usuario
    if (response.status === 200) {
      setUser({
        nombre: `${usuario.nombre}`,
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

    return (
        <AuthContext.Provider value={{ user, token, loginAction, logOut }}>
          {children}
        </AuthContext.Provider>
      );
}

export const useAuth = () => {
    return useContext(AuthContext);
  };
  
  export default Autenticacion;