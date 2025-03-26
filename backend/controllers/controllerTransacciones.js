const Transaccion = require('../models/Transaccion');
const Jugador = require('../models/Jugador');

exports.registrarTransaccion = async (req, res) => {
    try{
        const{
            idRemitente, idDestinatario, idJuego, tipo, monto
        }=req.body

        if (!["cobro", "pago"].includes(tipo)){
            return res.status(400).json({message: " Tipo de transacción invalido (debe ser 'cobro' o 'pago')"});
        }

        const remitente = await Jugador.findById(idRemitente)
        const destinatario = await Jugador.findById(idDestinatario)
        console.log(destinatario, remitente)
        if(!remitente || !destinatario){
            return res.status(404).json({message: "Remitente o destinatario no encontrados"});
        }

        if (tipo === "pago" && idRemitente.saldo < monto){
            return res.status(400).json({message: "Saldo insuficiente para realizar la transacción"});
        }

        const nuevaTransaccion = new Transaccion({idRemitente, idDestinatario, idJuego, tipo, monto});
        await nuevaTransaccion.save();

        if (tipo === "pago"){
            remitente.saldo -= monto;
            destinatario.saldo += monto;
        }else if(tipo === "cobro"){
            remitente.saldo += monto;
            destinatario.saldo -= monto;
        }

        await remitente.save();
        await destinatario.save();

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

