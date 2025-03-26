import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Autenticacion";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.email) {
      setError("El correo electrónico es requerido");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Por favor ingresa un correo electrónico válido");
      return false;
    }
    if (!formData.password) {
      setError("La contraseña es requerida");
      return false;
    }
    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const infoLogin = {
        correo: formData.email,
        contrasena: formData.password,
      };
    
      await auth.loginAction(infoLogin);

      
    } catch (err) {
      setError("Ocurrió un error. Por favor intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Bienvenido</h1>
          <p className="text-gray-600 mt-2">Ingresa a tu cuenta</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black placeholder-gray-400"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black placeholder-gray-400"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition`}
          >
            {isLoading ? "Procesando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
