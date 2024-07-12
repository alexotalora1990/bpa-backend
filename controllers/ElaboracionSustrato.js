import ElaboracionSustrato from "../models/ElaboracionSustrato.js";

const httpsElaboracionSustrato = {
    getElaboraciones: async (req, res) => {
        try {
            const elaboraciones = await ElaboracionSustrato.find().populate('idproceso idempleadooperario idempleadoresponsable');
            res.json({ elaboraciones });
        } catch (error) {
            console.error('Error al obtener las elaboraciones de sustrato:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getElaboracionID: async (req, res) => {
        const { id } = req.params;
        try {
            const elaboracion = await ElaboracionSustrato.findById(id).populate('idproceso idempleadooperario idempleadoresponsable');
            if (!elaboracion) {
                return res.status(404).json({ message: 'Elaboración de sustrato no encontrada' });
            }
            res.json({ elaboracion });
        } catch (error) {
            console.error('Error al obtener la elaboración de sustrato por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getElaboracionesActivas: async (req, res) => {
        try {
            const elaboraciones = await ElaboracionSustrato.find({ estado: 1 }).populate('idproceso idempleadooperario idempleadoresponsable');
            res.json({ elaboraciones });
        } catch (error) {
            console.error('Error al obtener las elaboraciones de sustrato activas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getElaboracionesInactivas: async (req, res) => {
        try {
            const elaboraciones = await ElaboracionSustrato.find({ estado: 0 }).populate('idproceso idempleadooperario idempleadoresponsable');
            res.json({ elaboraciones });
        } catch (error) {
            console.error('Error al obtener las elaboraciones de sustrato inactivas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    postElaboracion: async (req, res) => {
        try {
            const { idproceso, productocomercial, ingredienteActivo, dosisUtilizada, MetodoAplicacion, idempleadooperario, idempleadoresponsable } = req.body;
            const elaboracion = new ElaboracionSustrato({ idproceso, productocomercial, ingredienteActivo, dosisUtilizada, MetodoAplicacion, idempleadooperario, idempleadoresponsable });
            await elaboracion.save();
            res.json({ message: 'Elaboración de sustrato creada satisfactoriamente', elaboracion });
        } catch (error) {
            console.error('Error al crear elaboración de sustrato:', error);
            res.status(400).json({ message: 'No se pudo crear la elaboración de sustrato' });
        }
    },
    putElaboracion: async (req, res) => {
        const { id } = req.params;
        try {
            const elaboracion = await ElaboracionSustrato.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ elaboracion });
        } catch (error) {
            console.error('Error al actualizar elaboración de sustrato:', error);
            res.status(400).json({ message: 'No se pudo actualizar la elaboración de sustrato' });
        }
    },
    putElaboracionActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const elaboracion = await ElaboracionSustrato.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ elaboracion });
        } catch (error) {
            console.error('Error al activar elaboración de sustrato:', error);
            res.status(400).json({ message: 'No se pudo activar la elaboración de sustrato' });
        }
    },
    putElaboracionDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const elaboracion = await ElaboracionSustrato.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ elaboracion });
        } catch (error) {
            console.error('Error al desactivar elaboración de sustrato:', error);
            res.status(400).json({ message: 'No se pudo desactivar la elaboración de sustrato' });
        }
    }
};

export default httpsElaboracionSustrato;