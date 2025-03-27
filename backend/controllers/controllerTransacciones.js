const Transaccion = require('../models/Transaccion');
const Jugador = require('../models/Jugador');

const banca_id = "67e37dc5ae146eccd4457849";


exports.registrarTransaccion = async (req, res) => {
    try{
        const{
            idRemitente, idDestinatario: idDestinatarioOriginal, idJuego, tipo, monto
        }=req.body

        if (idRemitente === idDestinatarioOriginal){
            return res.status(400).json({message: " No puedes enviarte dinero a ti mismo"});
        }

        if (!["cobro", "pago"].includes(tipo)){
            return res.status(400).json({message: " Tipo de transacción invalido (debe ser 'cobro' o 'pago')"});
        }

        const remitente = await Jugador.findById(idRemitente)
        let destinatario = await Jugador.findById(idDestinatarioOriginal)
        let idDestinatario = idDestinatarioOriginal;

        if (!remitente){
            return res.status(400).json({message: "Remitente no encontrado"});
        }

        if(!destinatario && idDestinatario !== banca_id){
            es.status(400).json({message: " Destinatario no encontrado"});
        }

        if (tipo === "pago" && idRemitente.saldo < monto){
            return res.status(400).json({message: "Saldo insuficiente para realizar la transacción"});
        }

        const nuevaTransaccion = new Transaccion({idRemitente, idDestinatario, idJuego, tipo, monto});
        await nuevaTransaccion.save();

        if (tipo === "pago"){
            remitente.saldo -= monto;
            if (idDestinatario !== banca_id){
                destinatario.saldo += monto;
            }
        }else if(tipo === "cobro"){
            remitente.saldo += monto;
            if (idDestinatario !== banca_id){
                destinatario.saldo -= monto;
        }

        await remitente.save();
        if(idDestinatario !== banca_id){
            await destinatario.save();
        }
        }
        res.status(201).json({message: "Transacción realizada exitosamente", nuevaTransaccion});
    }catch (error){
        console.error(error);
        res.status(500).json({message: "Error al realizar la transacción", error});
    }
};

exports.obtenerTransacciones = async (req, res) => {
    try{
        const todasTransacciones = await Transaccion.find()
        .populate('idRemitente', 'idUsuario saldo')
        .populate('idDestinatario', 'idUsuario saldo')
        .populate('idJuego');

        res.status(200).json(todasTransacciones);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Error al obtener las transacciones", error: error.message});
    }
};

exports.obtenerTransaccionesPorJuego = async (req, res) => {
    try {
        const { idJuego } = req.params;
        const transacciones = await Transaccion.find({ idJuego })
            .populate('idRemitente', 'idUsuario saldo')
            .populate('idDestinatario', 'idUsuario saldo');

        res.status(200).json(transacciones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener transacciones por juego", error: error.message });
    }
};