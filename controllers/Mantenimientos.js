import Mantenimiento from "../models/Mantenimientos.js";

const httpsMantenimiento = {
    getMantenimientos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find()
            res.json({ mantenimientos });
        } catch (error) {
            console.error('Error al obtener los mantenimientos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getMantenimientoID: async (req, res) => {
        const { id } = req.params;
        try {
            const mantenimiento = await Mantenimiento.findById(id)
            if (!mantenimiento) {
                return res.status(404).json({ message: 'Mantenimiento no encontrado' });
            }
            res.json({ mantenimiento });
        } catch (error) {
            console.error('Error al obtener el mantenimiento por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getMantenimientosActivos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find({ estado: 1 })
            res.json({ mantenimientos });
        } catch (error) {
            console.error('Error al obtener los mantenimientos activos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getMantenimientosInactivos: async (req, res) => {
        try {
            const mantenimientos = await Mantenimiento.find({ estado: 0 })
            res.json({ mantenimientos });
        } catch (error) {
            console.error('Error al obtener los mantenimientos inactivos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    postMantenimiento: async (req, res) => {
        try {
            const { idgastos, idherramienta, fecha, verificacionrealizada, responsable, observaciones } = req.body;
            const mantenimiento = new Mantenimiento({ idgastos, idherramienta, fecha, verificacionrealizada, responsable, observaciones });
            await mantenimiento.save();
            res.json({ message: 'Mantenimiento creado satisfactoriamente', mantenimiento });
        } catch (error) {
            console.error('Error al crear mantenimiento:', error);
            res.status(400).json({ message: 'No se pudo crear el mantenimiento' });
        }
    },
    putMantenimiento: async (req, res) => {
        const { id } = req.params;
        try {
            const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ mantenimiento });
        } catch (error) {
            console.error('Error al actualizar mantenimiento:', error);
            res.status(400).json({ message: 'No se pudo actualizar el mantenimiento' });
        }
    },
    putMantenimientoActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ mantenimiento });
        } catch (error) {
            console.error('Error al activar mantenimiento:', error);
            res.status(400).json({ message: 'No se pudo activar el mantenimiento' });
        }
    },
    putMantenimientoDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const mantenimiento = await Mantenimiento.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ mantenimiento });
        } catch (error) {
            console.error('Error al desactivar mantenimiento:', error);
            res.status(400).json({ message: 'No se pudo desactivar el mantenimiento' });
        }
    }
};

export default httpsMantenimiento;
