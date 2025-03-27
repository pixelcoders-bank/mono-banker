const Jugador = require('../models/Jugador');

exports.registrarJugador = async (req, res) => {
    try{
        const{
            idUsuario, idJuego, saldo
        }=req.body

        const jugadorExistente = await Jugador.findOne({idUsuario, idJuego});
        if(jugadorExistente){
            //Devuelve OK para evitar un error innecesario
            return res.status(200).json({ message: "El jugador ya está registrado en este juego", jugador: jugadorExistente }); 
        }

        const nuevoJugador = new Jugador ({idUsuario, idJuego, saldo});
        await nuevoJugador.save();

        res.status(201).json({message: "Jugador registrado exitosamente", jugador: nuevoJugador});

    }catch (error){
        console.error(error);
        res.status(500).json({message: "Error al registrar usuario", error})
    }
}

exports.obtenerJugadores = async (req, res) => {
    try{
        const jugadores = await Jugador.find().populate('idUsuario').populate('idJuego');
        res.status(200).json(jugadores);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener jugadores", error});
    }
}

exports.obtenerJugadorPorId = async (req, res) => {
    try{
        const jugador = await Jugador.findById(req.params.id).populate('idUsuario').populate('idJuego');
        if(!jugador){
            return res.status(404).json({message: "Jugador no encontrado"})
        }
        res.json(jugador);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener jugador", error});
    }
}

exports.actualizarSaldo = async (req, res) => {
    try{
        const {
            saldo
        }=req.body;
        const jugadorActualizado = await Jugador.findByIdAndUpdate(
            req.params.id,
            {saldo},
            {new:true}
        );

        if(!jugadorActualizado){
            return res.status(404).json({message: "Jugador no encontrado", error});
        }

        res.json({message: "Saldo actualizado correctamente", jugadorActualizado})
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al actualizar el saldo", error});
    }
};

exports.obtenerJugadoresPorJuego = async (req, res) => {
    try {
        const { idJuego } = req.params;
        
        const jugadores = await Jugador.find({ idJuego }).populate('idUsuario');

        if (jugadores.length === 0) {
            return res.status(404).json({ mensaje: 'No hay jugadores en esta partida' });
        }

        res.status(200).json({ mensaje: 'Jugadores obtenidos exitosamente', cantidad: jugadores.length, jugadores });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
        }
    };
exports.eliminarJugador = async (req, res) => {
    try{
        const { id } = req.params;
        const jugador = await Jugador.findById(id);
        if (!jugador){
            res.status(404).json({ mensaje: 'Jugador no encontrado'});
        }

        await Jugador.findByIdAndDelete(id);

        res.status(200).json({ mensaje:"Jugador eliminado exitosamente"});
    }catch(error){
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
    }
};