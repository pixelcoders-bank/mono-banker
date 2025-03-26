import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./Autenticacion";
import Cookies from "js-cookie";
export default function Guardia() {
  const auth = useAuth();
  const location = useLocation();
  // Si no hay usuario logeado, redirecciona a la página de login
  if (!auth.token) {
    if (Cookies.get("session")) {

      return <Outlet />;
    }


    return <Navigate to="/" />;
  }

  return <Outlet />;
}
