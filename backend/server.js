const dotenv = require('dotenv');
// Configuración del entorno
dotenv.config();

const app = require("./app")
const conectarMongoDB = require("./config/database");


//Configurar base de datos
conectarMongoDB.conectarBD();

const PORT = process.env.PORT || 5000;

//Ping al servidor
const server = app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});