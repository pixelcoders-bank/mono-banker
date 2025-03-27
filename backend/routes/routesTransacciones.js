const express = require('express');
const router = express.Router();
const controllerTransacciones = require('../controllers/controllerTransacciones');

router.post('/', controllerTransacciones.registrarTransaccion);
router.get('/', controllerTransacciones.obtenerTransacciones);
router.get('/:idJuego', controllerTransacciones.obtenerTransaccionesPorJuego);

module.exports = router;