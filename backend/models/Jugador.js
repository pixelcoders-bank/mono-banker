const mongoose = require('mongoose')

const JugadorSchema = new mongoose.Schema({
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuarios', required: true },
  idJuego: { type: mongoose.Schema.Types.ObjectId, ref: 'Juegos', required: true },
  saldo: { type: Number, required: true, default: 1500}
});


module.exports = mongoose.model('Jugadores', JugadorSchema);