import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registro = () => {
    const [usuario, setUsuario] = useState({ nombre: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Obtener usuarios almacenados en localStorage
        const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

        // Verificar si el correo ya está registrado
        const usuarioExistente = usuariosGuardados.find(user => user.email === usuario.email);
        if (usuarioExistente) {
            alert('El correo ya está registrado. Usa otro o inicia sesión.');
            setLoading(false);
            return;
        }

        // Guardar el nuevo usuario en localStorage
        usuariosGuardados.push(usuario);
        localStorage.setItem('usuarios', JSON.stringify(usuariosGuardados));

        alert('Usuario registrado correctamente');
        setLoading(false);
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registro</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={usuario.nombre}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black placeholder-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="tu@email.com"
                            value={usuario.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black placeholder-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={usuario.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black placeholder-gray-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-4 rounded-lg font-medium text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition`}
                    >
                        {loading ? 'Registrando...' : 'Registrarse'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        ¿Ya tienes una cuenta?{" "}
                        <button
                            onClick={() => navigate("/")}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Inicia sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registro;

