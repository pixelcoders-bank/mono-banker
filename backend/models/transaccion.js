const mongoose = require('mongoose')

const TransaccionesSchema = new mongoose.Schema({
  idRemitente: { type: mongoose.Schema.Types.ObjectId, ref: 'Jugadores', required: true },
  idDestinatario: { type: mongoose.Schema.Types.ObjectId, ref: 'Jugadores', required: true },
  idJuego: { type: mongoose.Schema.Types.ObjectId, ref: 'Juego', required: true },
  tipo: { type: String, enum: ['cobro', 'pago'],required: true },
  monto: { type: Number, required: true }
});

module.exports = mongoose.model('Transacciones', TransaccionesSchema);