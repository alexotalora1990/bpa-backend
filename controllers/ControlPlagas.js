import ControlPlagas from "../models/ControlPlagas.js";

const httpsControlPlagas = {
    getControlPlagas: async (req, res) => {
        try {
            const controlPlagas = await ControlPlagas.find().populate('idcultivo idempleado idoperario');
            res.json({ controlPlagas });
        } catch (error) {
            console.error('Error al obtener los controles de plagas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getControlPlagaID: async (req, res) => {
        const { id } = req.params;
        try {
            const controlPlaga = await ControlPlagas.findById(id).populate('idcultivo idempleado idoperario');
            if (!controlPlaga) {
                return res.status(404).json({ message: 'Control de plaga no encontrado' });
            }
            res.json({ controlPlaga });
        } catch (error) {
            console.error('Error al obtener el control de plaga por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getControlPlagasActivos: async (req, res) => {
        try {
            const controlPlagas = await ControlPlagas.find({ estado: 1 }).populate('idcultivo idempleado idoperario');
            res.json({ controlPlagas });
        } catch (error) {
            console.error('Error al obtener los controles de plagas activos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getControlPlagasInactivos: async (req, res) => {
        try {
            const controlPlagas = await ControlPlagas.find({ estado: 0 }).populate('idcultivo idempleado idoperario');
            res.json({ controlPlagas });
        } catch (error) {
            console.error('Error al obtener los controles de plagas inactivos:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    postControlPlagas: async (req, res) => {
        try {
            const { idcultivo, idempleado, idoperario, nombre, ingredienteActivo, dosis, observaciones } = req.body;
            const controlPlaga = new ControlPlagas({ idcultivo, idempleado, idoperario, nombre, ingredienteActivo, dosis, observaciones });
            await controlPlaga.save();
            res.json({ message: 'Control de plaga creado satisfactoriamente', controlPlaga });
        } catch (error) {
            console.error('Error al crear control de plaga:', error);
            res.status(400).json({ message: 'No se pudo crear el control de plaga' });
        }
    },
    putControlPlagas: async (req, res) => {
        const { id } = req.params;
        try {
            const controlPlaga = await ControlPlagas.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ controlPlaga });
        } catch (error) {
            console.error('Error al actualizar control de plaga:', error);
            res.status(400).json({ message: 'No se pudo actualizar el control de plaga' });
        }
    },
    putControlPlagasActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const controlPlaga = await ControlPlagas.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ controlPlaga });
        } catch (error) {
            console.error('Error al activar control de plaga:', error);
            res.status(400).json({ message: 'No se pudo activar el control de plaga' });
        }
    },
    putControlPlagasDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const controlPlaga = await ControlPlagas.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ controlPlaga });
        } catch (error) {
            console.error('Error al desactivar control de plaga:', error);
            res.status(400).json({ message: 'No se pudo desactivar el control de plaga' });
        }
    }
};

export default httpsControlPlagas;
