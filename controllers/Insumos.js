import Insumo from "../models/Insumos.js";

const httpsInsumo = {
    getInsumos: async (req, res) => {
        try {
            const insumos = await Insumo.find().populate('idproveedor');
            res.json({ insumos });
        } catch (error) {
            console.error('Error al obtener los insumos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getInsumoID: async (req, res) => {
        const { id } = req.params;
        try {
            const insumo = await Insumo.findById(id).populate('idproveedor');
            if (!insumo) {
                return res.status(404).json({ message: 'Insumo no encontrado' });
            }
            res.json({ insumo });
        } catch (error) {
            console.error('Error al obtener el insumo por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getInsumosActivos: async (req, res) => {
        try {
            const insumos = await Insumo.find({ estado: 1 }).populate('idproveedor');
            res.json({ insumos });
        } catch (error) {
            console.error('Error al obtener los insumos activos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getInsumosInactivos: async (req, res) => {
        try {
            const insumos = await Insumo.find({ estado: 0 }).populate('idproveedor');
            res.json({ insumos });
        } catch (error) {
            console.error('Error al obtener los insumos inactivos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    postInsumo: async (req, res) => {
        try {
            const { idproveedor, nombre, relacion, cantidad, unidad, responsable, observaciones, total } = req.body;
            const insumo = new Insumo({ idproveedor, nombre, relacion, cantidad, unidad, responsable, observaciones, total });
            await insumo.save();
            res.json({ message: 'Insumo creado satisfactoriamente', insumo });
        } catch (error) {
            console.error('Error al crear insumo:', error);
            res.status(400).json({ message: 'No se pudo crear el insumo' });
        }
    },
    putInsumo: async (req, res) => {
        const { id } = req.params;
        try {
            const insumo = await Insumo.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ insumo });
        } catch (error) {
            console.error('Error al actualizar insumo:', error);
            res.status(400).json({ message: 'No se pudo actualizar el insumo' });
        }
    },
    putInsumoActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const insumo = await Insumo.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ insumo });
        } catch (error) {
            console.error('Error al activar insumo:', error);
            res.status(400).json({ message: 'No se pudo activar el insumo' });
        }
    },
    putInsumoDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const insumo = await Insumo.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ insumo });
        } catch (error) {
            console.error('Error al desactivar insumo:', error);
            res.status(400).json({ message: 'No se pudo desactivar el insumo' });
        }
    }
};

export default httpsInsumo;


