import Maquinaria from "../models/MaquinariaHerramientas.js";

const httpsMaquinaria = {
    getMaquinarias: async (req, res) => {
        try {
            const maquinarias = await Maquinaria.find().populate('idproveedores');
            res.json({ maquinarias });
        } catch (error) {
            console.error('Error al obtener las maquinarias:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getMaquinariaID: async (req, res) => {
        const { id } = req.params;
        try {
            const maquinaria = await Maquinaria.findById(id).populate('idproveedores');
            if (!maquinaria) {
                return res.status(404).json({ message: 'Maquinaria no encontrada' });
            }
            res.json({ maquinaria });
        } catch (error) {
            console.error('Error al obtener la maquinaria por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getMaquinariasActivas: async (req, res) => {
        try {
            const maquinarias = await Maquinaria.find({ estado: 1 }).populate('idproveedores');
            res.json({ maquinarias });
        } catch (error) {
            console.error('Error al obtener las maquinarias activas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getMaquinariasInactivas: async (req, res) => {
        try {
            const maquinarias = await Maquinaria.find({ estado: 0 }).populate('idproveedores');
            res.json({ maquinarias });
        } catch (error) {
            console.error('Error al obtener las maquinarias inactivas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    postMaquinaria: async (req, res) => {
        try {
            const { idproveedores, nombre, tipo, observaciones, cantidad, Total, fechaCompra } = req.body;
            const maquinaria = new Maquinaria({ idproveedores, nombre, tipo, observaciones, cantidad, Total, fechaCompra });
            await maquinaria.save();
            res.json({ message: 'Maquinaria creada satisfactoriamente', maquinaria });
        } catch (error) {
            console.error('Error al crear maquinaria:', error);
            res.status(400).json({ message: 'No se pudo crear la maquinaria' });
        }
    },
    putMaquinaria: async (req, res) => {
        const { id } = req.params;
        try {
            const maquinaria = await Maquinaria.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ maquinaria });
        } catch (error) {
            console.error('Error al actualizar maquinaria:', error);
            res.status(400).json({ message: 'No se pudo actualizar la maquinaria' });
        }
    },
    putMaquinariaActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const maquinaria = await Maquinaria.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ maquinaria });
        } catch (error) {
            console.error('Error al activar maquinaria:', error);
            res.status(400).json({ message: 'No se pudo activar la maquinaria' });
        }
    },
    putMaquinariaDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const maquinaria = await Maquinaria.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ maquinaria });
        } catch (error) {
            console.error('Error al desactivar maquinaria:', error);
            res.status(400).json({ message: 'No se pudo desactivar la maquinaria' });
        }
    }
};

export default httpsMaquinaria;
