import Gasto from "../models/Gastos.js";

const httpsGasto = {
    getGastos: async (req, res) => {
        try {
            const gastos = await Gasto.find()
            res.json({ gastos });
        } catch (error) {
            console.error('Error al obtener los gastos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getGastoID: async (req, res) => {
        const { id } = req.params;
        try {
            const gasto = await Gasto.findById(id)
                .populate('idinsumos')
                .populate('idsemillas')
                .populate('idmantenimiento');
            if (!gasto) {
                return res.status(404).json({ message: 'Gasto no encontrado' });
            }
            res.json({ gasto });
        } catch (error) {
            console.error('Error al obtener el gasto por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getGastosActivos: async (req, res) => {
        try {
            const gastos = await Gasto.find({ estado: 1 })
            res.json({ gastos });
        } catch (error) {
            console.error('Error al obtener los gastos activos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getGastosInactivos: async (req, res) => {
        try {
            const gastos = await Gasto.find({ estado: 0 })
            res.json({ gastos });
        } catch (error) {
            console.error('Error al obtener los gastos inactivos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    postGasto: async (req, res) => {
        try {
            const { nombre, fecha, numfactura, descripcion, idinsumos, idsemillas, idmantenimiento } = req.body;
            const gasto = new Gasto({ nombre, fecha, numfactura, descripcion, idinsumos, idsemillas, idmantenimiento });
            await gasto.save();
            res.json({ message: 'Gasto creado satisfactoriamente', gasto });
        } catch (error) {
            console.error('Error al crear gasto:', error);
            res.status(400).json({ message: 'No se pudo crear el gasto' });
        }
    },
    putGasto: async (req, res) => {
        const { id } = req.params;
        try {
            const gasto = await Gasto.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ gasto });
        } catch (error) {
            console.error('Error al actualizar gasto:', error);
            res.status(400).json({ message: 'No se pudo actualizar el gasto' });
        }
    },
    putGastoActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const gasto = await Gasto.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ gasto });
        } catch (error) {
            console.error('Error al activar gasto:', error);
            res.status(400).json({ message: 'No se pudo activar el gasto' });
        }
    },
    putGastoDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const gasto = await Gasto.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ gasto });
        } catch (error) {
            console.error('Error al desactivar gasto:', error);
            res.status(400).json({ message: 'No se pudo desactivar el gasto' });
        }
    }
};

export default httpsGasto;
