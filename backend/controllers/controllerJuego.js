const Juego = require('../models/Juego');

// Crear juego
exports.crearJuego = async (req, res) =>{
    try {
        const { idHost, estado, turnoJugador, codigo } = req.body;
        // Validar los datos 
        if (!idHost || !estado || !turnoJugador || !codigo) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        
        // Crear instancia del juego
        const nuevoJuego = new Juego(req.body);
        await nuevoJuego.save();
        res.status(201).json({mensaje: 'Juego creado exitosamente', juego: nuevoJuego});
    } catch (error) {
        res.status(400).json({mensaje: 'Error al crear el juego', error: error.message});
    }
}

// Obtener todos los juego
exports.obtenerJuegos = async (req, res) => {
    try {
        const juegos = await Juego.find();
        res.status(200).json({mensaje: 'Partidas obtenidas exitosamente', cantidad: juegos.length, partidas: juegos});
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el servidor', error: error.message});
    }
}

exports.obtenerUnJuego = async (req, res) => {
    try {
        //verificar juego
        const juego = await Juego.findById(req.params.id);
        if(!juego){
            return res.status(404).json({mensaje: 'La partida no existe'});
        }
        res.status(200).json({mensaje: 'Partida obtenida exitosamente', juego});
        
    } catch (error) {
        res.status(500).json({mensaje: 'Error en el servidor', error: error.message});
    }
}

exports.obtenerJuegoPorCodigo = async (req, res) => {
    try {
        const { codigo } = req.params;
        const juego = await Juego.findOne({ codigo });
        if (!juego) {
            return res.status(404).json({ mensaje: 'No se encontró ninguna partida con ese código' });
        }
        res.status(200).json({ mensaje: 'Partida obtenida exitosamente', juego });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};

exports.actualizarJuego = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, turnoJugador } = req.body;

        // Validar
        if (!estado || !turnoJugador) {
            return res.status(400).json({ message: "Faltan campos obligatorios" });
        }
        const juegoActualizado = await Juego.findByIdAndUpdate(id, req.body, { new: true });
        
        if (!juegoActualizado) {
            return res.status(404).json({ message: "Partida no encontrada" });
        }
        
        res.status(200).json({ mensaje: "Partida actualizada correctamente", juegoActualizado });
        } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error: error.message });
    
        }
}