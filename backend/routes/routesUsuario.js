const express = require('express');
const router = express.Router();
const controllerUsuario = require('../controllers/controllerUsuario');

router.get('/', controllerUsuario.obtenerUsuarios);
router.post('/registro', controllerUsuario.registrarUsuario);
router.post('/login', controllerUsuario.iniciarSesion);

module.exports = router;