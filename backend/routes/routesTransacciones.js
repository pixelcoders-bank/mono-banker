const express = require('express');
const router = express.Router();
const controllerTransacciones = require('../controllers/controllerTransacciones');

router.post('/', controllerTransacciones.registrarTransaccion);
router.get('/', controllerTransacciones.obtenerTransacciones);

module.exports = router;