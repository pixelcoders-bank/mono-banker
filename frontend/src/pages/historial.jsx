import React from "react";
import { useNavigate } from "react-router-dom";

const Historial = () => {
    const navigate = useNavigate();

    // Datos simulados del historial de transacciones
    const historial = [
        { de: "J1", accion: "Cobró", a: "J2", monto: "+ $100" },
        { de: "J2", accion: "Cobró", a: "J3", monto: "+ $200" },
        { de: "J3", accion: "Pagó", a: "J6", monto: "- $200" },
        { de: "J4", accion: "Pagó", a: "🏦", monto: "- $200" },
        { de: "J1", accion: "Cobró", a: "🏦", monto: "+ $200" },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md text-center border border-black">
                <h1 className="text-2xl font-bold text-red-600">MONOPOLY</h1>
                <h2 className="text-lg text-red-500 mb-4">Banquero</h2>
                <hr className="mb-4 border-gray-400" />

                <h3 className="text-lg font-bold text-black">Historial</h3>


                {/* Tabla del historial */}
                <div className="mt-4 border border-black rounded-lg p-3 bg-white">
                    {historial.map((mov, index) => (
                        <div key={index} className="flex justify-between items-center border-t border-black py-2 text-black">
                            <span className="font-bold">{mov.de}</span>
                            <span className="bg-gray-200 px-2 py-1 rounded-lg">{mov.accion}</span>
                            <span className="font-bold">{mov.a}</span>
                            <span className={`${mov.monto.startsWith("+") ? "text-green-600" : "text-red-600"} font-bold`}>
                                {mov.monto}
                            </span>
                        </div>
                    ))}
                </div>

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

export default Historial;
