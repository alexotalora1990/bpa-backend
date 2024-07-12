import Nomina from '../models/Nomina.js';
import mongoose from 'mongoose';

const httpsNomina = {
    getNominas: async (req, res) => {
        try {
            const nominas = await Nomina.find();
            res.json({ nominas });
        } catch (error) {
            console.error('Error al obtener las nominas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getNominaID: async (req, res) => {
        const { id } = req.params;
        try {
            const nomina = await Nomina.findById(id);
            if (!nomina) {
                return res.status(404).json({ message: 'Nómina no encontrada' });
            }
            res.json({ nomina });
        } catch (error) {
            console.error('Error al obtener la nómina por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    getNominaActivos: async (req, res) => {
        const nominas = await Nomina.find({estado: 1})
        res.json({ nominas })
    },
    getNominaInactivos: async (req, res) => {
        const nominas = await Nomina.find({estado: 0})
        res.json({ nominas })
    },

    postNomina: async (req, res) => {
        try {
            const { fecha, idempleados, tipo, valor } = req.body;
            const nomina = new Nomina({ fecha, idempleados, tipo, valor });
            await nomina.save();
            res.json({ message: 'Nómina creada satisfactoriamente', nomina });
        } catch (error) {
            console.error('Error al crear la nómina:', error);
            res.status(400).json({ message: 'No se pudo crear la nómina' });
        }
    },

    putNomina: async (req, res) => {
        const { id } = req.params;
        const {estado, ...resto}=req.body;
        try {
            const nominaActualizada = await Nomina.findByIdAndUpdate(id, { estado, ...resto }, { new: true });
            res.json({ nominaActualizada });
        } catch (error) {
            console.error('Error al actualizar la nómina:', error);
            res.status(400).json({ message: 'No se pudo actualizar la nómina' });
        }
    },

    putNominaActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const nomina = await Nomina.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ nomina });
        } catch (error) {
            console.error('Error al activar la nómina:', error);
            res.status(400).json({ message: 'No se pudo activar la nómina' });
        }
    },

    putNominaDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const nomina = await Nomina.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ nomina });
        } catch (error) {
            console.error('Error al desactivar la nómina:', error);
            res.status(400).json({ message: 'No se pudo desactivar la nómina' });
        }
    }
};

export default httpsNomina;


