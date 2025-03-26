const mongoose = require('mongoose')

const TransaccionesSchema = new mongoose.Schema({
  idRemitente: { type: Number, ref: 'Jugadores', required: true },
  idDestinatario: { type: Number, ref: 'Jugadores', required: true },
  idJuego: { type: Number, ref: 'Juego', required: true },
  tipo: { type: String, enum: ['cobro', 'pago'],required: true },
  monto: { type: Number, required: true }
});

module.exports = mongoose.model('Transacciones', TransaccionesSchema);