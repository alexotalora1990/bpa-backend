import Inventario from "../models/Inventarios.js";

const httpsInventario = {
    getInventarios: async (req, res) => {
        try {
            const inventarios = await Inventario.find()
                .populate('idsemillas')
                .populate('idinsumos')
                .populate('idmaquinaria');
            res.json({ inventarios });
        } catch (error) {
            console.error('Error al obtener los inventarios:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getInventarioID: async (req, res) => {
        const { id } = req.params;
        try {
            const inventario = await Inventario.findById(id)
                .populate('idsemillas')
                .populate('idinsumos')
                .populate('idmaquinaria');
            if (!inventario) {
                return res.status(404).json({ message: 'Inventario no encontrado' });
            }
            res.json({ inventario });
        } catch (error) {
            console.error('Error al obtener el inventario por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getInventariosActivos: async (req, res) => {
        try {
            const inventarios = await Inventario.find({ estado: 1 })
            res.json({ inventarios });
        } catch (error) {
            console.error('Error al obtener los inventarios activos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getInventariosInactivos: async (req, res) => {
        try {
            const inventarios = await Inventario.find({ estado: 0 })
            res.json({ inventarios });
        } catch (error) {
            console.error('Error al obtener los inventarios inactivos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    postInventario: async (req, res) => {
        try {
            const { tipo, observacion, unidad, cantidad, idsemillas, idinsumos, idmaquinaria } = req.body;
            const inventario = new Inventario({ tipo, observacion, unidad, cantidad, idsemillas, idinsumos, idmaquinaria });
            await inventario.save();
            res.json({ message: 'Inventario creado satisfactoriamente', inventario });
        } catch (error) {
            console.error('Error al crear inventario:', error);
            res.status(400).json({ message: 'No se pudo crear el inventario' });
        }
    },
    putInventario: async (req, res) => {
        const { id } = req.params;
        try {
            const inventario = await Inventario.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ inventario });
        } catch (error) {
            console.error('Error al actualizar inventario:', error);
            res.status(400).json({ message: 'No se pudo actualizar el inventario' });
        }
    },
    putInventarioActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const inventario = await Inventario.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ inventario });
        } catch (error) {
            console.error('Error al activar inventario:', error);
            res.status(400).json({ message: 'No se pudo activar el inventario' });
        }
    },
    putInventarioDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const inventario = await Inventario.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ inventario });
        } catch (error) {
            console.error('Error al desactivar inventario:', error);
            res.status(400).json({ message: 'No se pudo desactivar el inventario' });
        }
    }
};

export default httpsInventario;
