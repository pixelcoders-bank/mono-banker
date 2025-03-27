const express = require('express');
const router = express.Router();
const {registrarJugador, obtenerJugadores, obtenerJugadorPorId, actualizarSaldo, obtenerJugadoresPorJuego, eliminarJugador} = require('../controllers/controllerJugador');

router.post('/registro', registrarJugador);
router.get('/', obtenerJugadores);
router.get('/:id', obtenerJugadorPorId);
router.put('/:id', actualizarSaldo);
router.get('/juego/:idJuego', obtenerJugadoresPorJuego);
router.delete('/:id', eliminarJugador);
module.exports = router;