const express = require('express');
const controllerJuego = require("../controllers/controllerJuego");

const router = express.Router();

router.get('/', controllerJuego.obtenerJuegos);
router.get('/:id', controllerJuego.obtenerUnJuego);
router.post('/', controllerJuego.crearJuego);
router.get('/codigo/:codigo', controllerJuego.obtenerJuegoPorCodigo);
router.put('/:id', controllerJuego.actualizarJuego);

module.exports = router;