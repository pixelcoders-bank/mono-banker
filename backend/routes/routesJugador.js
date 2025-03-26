const express = require('express');
const router = express.Router();
const {registrarJugador, obtenerJugadores, obtenerJugadorPorId, actualizarSaldo, obtenerJugadoresPorJuego} = require('../controllers/controllerJugador');

router.post('/registro', registrarJugador);
router.get('/', obtenerJugadores);
router.get('/:id', obtenerJugadorPorId);
router.put('/:id', actualizarSaldo);
router.get('/juego/:idJuego', obtenerJugadoresPorJuego);

module.exports = router;