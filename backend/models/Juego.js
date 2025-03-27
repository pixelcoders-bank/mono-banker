const mongoose = require('mongoose')

const JuegoSchema = new mongoose.Schema({
  idHost: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
  codigo: { type: String, unique: true, required: true }, //codigo unico partida
  estado: { type: String, required: true },
  turnoJugador: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", defaultValue:"" },
});


module.exports = mongoose.model("Juegos", JuegoSchema);
