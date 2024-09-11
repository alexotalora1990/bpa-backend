import Comprador from "../models/Comprador.js";

const httpsComprador = {
    getCompradores: async (req, res) => {
        try {
            const compradores = await Comprador.find()
            .populate('idproduccion')
            res.json({ compradores });
        } catch (error) {
            console.error('Error al obtener los compradores:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getCompradorID: async (req, res) => {
        const { id } = req.params;
        try {
            const comprador = await Comprador.findById(id).populate('idproduccion');
            if (!comprador) {
                return res.status(404).json({ message: 'Comprador no encontrado' });
            }
            res.json({ comprador });
        } catch (error) {
            console.error('Error al obtener el comprador por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getCompradoresActivos: async (req, res) => {
        try {
            const compradores = await Comprador.find({ estado: 1 })
            .populate("idproduccion")
            res.json({ compradores });
        } catch (error) {
            console.error('Error al obtener los compradores activos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getCompradoresInactivos: async (req, res) => {
        try {
            const compradores = await Comprador.find({ estado: 0 })
            .populate("idproduccion")
            res.json({ compradores });
        } catch (error) {
            console.error('Error al obtener los compradores inactivos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    postComprador: async (req, res) => {
        try {
            const { idproduccion, nombre, telefono, cantidad, numguiaTransporte, numloteComercial, valor } = req.body;
            const comprador = new Comprador({ idproduccion, nombre, telefono, cantidad, numguiaTransporte, numloteComercial, valor });
            await comprador.save();
            res.json({ message: 'Comprador creado satisfactoriamente', comprador });
        } catch (error) {
            console.error('Error al crear comprador:', error);
            res.status(400).json({ message: 'No se pudo crear el comprador' });
        }
    },
    putComprador: async (req, res) => {
        const { id } = req.params;
        try {
            const comprador = await Comprador.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ comprador });
        } catch (error) {
            console.error('Error al actualizar comprador:', error);
            res.status(400).json({ message: 'No se pudo actualizar el comprador' });
        }
    },
    putCompradorActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const comprador = await Comprador.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ comprador });
        } catch (error) {
            console.error('Error al activar comprador:', error);
            res.status(400).json({ message: 'No se pudo activar el comprador' });
        }
    },
    putCompradorDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const comprador = await Comprador.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ comprador });
        } catch (error) {
            console.error('Error al desactivar comprador:', error);
            res.status(400).json({ message: 'No se pudo desactivar el comprador' });
        }
    }
};

export default httpsComprador;


