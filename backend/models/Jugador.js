const mongoose = require('mongoose')

const JugadorSchema = new mongoose.Schema({
  idUsuario: { type: Number, ref: 'Usuario', required: true },
  idJuego: { type: Number, ref: 'Juego', required: true },
  saldo: { type: Number, required: true }
});


module.exports = mongoose.model('Jugadores', JugadorSchema);