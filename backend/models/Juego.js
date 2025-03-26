const mongoose = require('mongoose')

const JuegoSchema = new mongoose.Schema({
  idHost: { type: Number, ref: "Usuario", required: true },
  estado: { type: String, required: true },
  turno: { type: String, required: true },
});


module.exports = mongoose.model("Juego", JuegoSchema);
