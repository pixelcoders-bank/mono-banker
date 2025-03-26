const express = require("express");
const cors = require('cors');
const cookieParser= require("cookie-parser")


const app = express();

app.use(express.json());
app.use(cookieParser());

app.set('trust proxy', 1);

app.use(cors({
    origin : process.env.URL_CLIENT,// Permitir solicitudes desde el frontend
    methods : [
        'GET',
        'POST',
        'PUT',
        'DELETE'
    ], 
    credentials : true // para enviar y recibir cookies
}));

//Importar rutas
app.use('/api/juegos', require('./routes/routesJuego'));
app.use('/api/usuarios', require('./routes/routesUsuario'));
app.use('/api/jugadores', require('./routes/routesJugador'));
app.use('/api/transacciones', require('./routes/routesTransacciones')); 

//Estados
app.use((req, res, next) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});
app.use((error, req, res, next) => {
  console.error(error.stack);
  res
    .status(500)
    .json({ message: "Error en el servidor", error: error.message });
});

module.exports = app