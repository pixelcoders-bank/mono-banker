const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');


exports.registrarUsuario = async (req, res) => {
    try{
        const {
            nombre, correo, contrasena 
        } = req.body;

        const usuarioExistente = await Usuario.findOne({
            correo
        });
        if(usuarioExistente){
            return res.status(400).json({ message: "El usuario ya esta registrado" });
        }

        const nuevoUsuario = new Usuario(req.body) 
        nuevoUsuario.contrasena = await bcrypt.hash(contrasena, 10);
        await nuevoUsuario.save();

        res.status(201).json({ message: "Usuario creado satisfactoriamente", nuevoUsuario});

    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Error al crear el usuario", error: error.message });
    }
};

exports.iniciarSesion = async (req, res) => {
    try{
        const {
        correo, contrasena
    }=req.body;

    const usuario = await Usuario.findOne({
        correo
    });

    if(!usuario){
        return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const esValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!esValida){
        return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const usuarioSeguro = {
        _id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo,
    };

    res.status(200).json({ message: "Inicio de sesión exitoso", usuario: usuarioSeguro});
    }catch(error){
        console.log(error);
    res.status(500).json({ message: "Error al iniciar sesion", error });
    }
};

// Obtener todos los usuarios

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json({mensaje: 'Usuarios obtenidas exitosamente', cantidad: usuarios.length, usuarios: usuarios});
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el servidor', error: error.message});
    }
}