
import Siembra from '../models/Siembra.js';
import moongose from "mongoose"


const httpsSiembra = {
    getSiembras: async (req, res) => {
        try {
            const siembras = await Siembra.find()
            res.json({ siembras });
        } catch (error) {
            console.error('Error al obtener las siembras:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getSiembraID: async (req, res) => {
        const { id } = req.params;
        try {
            const siembra = await Siembra.findById(id)
                .populate('idcultivos')
                .populate('idempleados')
                .populate('idinventario');
            if (!siembra) {
                return res.status(404).json({ message: 'Siembra no encontrada' });
            }
            res.json({ siembra });
        } catch (error) {
            console.error('Error al obtener la siembra por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getSiembrasActivas: async (req, res) => {
        try {
            const siembras = await Siembra.find({ estado: 1 })
            res.json({ siembras });
        } catch (error) {
            console.error('Error al obtener las siembras activas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getSiembrasInactivas: async (req, res) => {
        try {
            const siembras = await Siembra.find({ estado: 0 })
            res.json({ siembras });
        } catch (error) {
            console.error('Error al obtener las siembras inactivas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    postSiembra: async (req, res) => {
        try {
            const { idcultivos, idempleados, idinventario, fechasiembra, fechacosecha, transplante, cultivoanterior } = req.body;
            const siembra = new Siembra({ idcultivos, idempleados, idinventario, fechasiembra, fechacosecha, transplante, cultivoanterior });
            await siembra.save();
            res.json({ message: 'Siembra creada satisfactoriamente', siembra });
        } catch (error) {
            console.error('Error al crear siembra:', error);
            res.status(400).json({ message: 'No se pudo crear la siembra' });
        }
    },
    putSiembra: async (req, res) => {
        const { id } = req.params;
        try {
            const siembra = await Siembra.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ siembra });
        } catch (error) {
            console.error('Error al actualizar siembra:', error);
            res.status(400).json({ message: 'No se pudo actualizar la siembra' });
        }
    },
    putSiembraActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const siembra = await Siembra.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ siembra });
        } catch (error) {
            console.error('Error al activar siembra:', error);
            res.status(400).json({ message: 'No se pudo activar la siembra' });
        }
    },
    putSiembraDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const siembra = await Siembra.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ siembra });
        } catch (error) {
            console.error('Error al desactivar siembra:', error);
            res.status(400).json({ message: 'No se pudo desactivar la siembra' });
        }
    }
};

export default httpsSiembra;