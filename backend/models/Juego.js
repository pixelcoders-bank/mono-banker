const mongoose = require('mongoose')

const JuegoSchema = new mongoose.Schema({
  idHost: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
  estado: { type: String, required: true },
  turno: { type: String, required: true },
});


module.exports = mongoose.model("Juegos", JuegoSchema);
