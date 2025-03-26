const mongoose = require('mongoose')

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true, unique: true},
  contrasena: { type: String, required: true },
  correo: { type: String, required: true, unique: true , match: [/.+@.+\..+/, 'Por favor ingrese un email valido']}
});



module.exports = mongoose.model('Usuario', UsuarioSchema);