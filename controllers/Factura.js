import Factura from "../models/Factura.js";

const httpsFactura = {
    getFacturas: async (req, res) => {
        try {
            const facturas = await Factura.find()
            res.json({ facturas });
        } catch (error) {
            console.error('Error al obtener las facturas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getFacturaID: async (req, res) => {
        const { id } = req.params;
        try {
            const factura = await Factura.findById(id)
            if (!factura) {
                return res.status(404).json({ message: 'Factura no encontrada' });
            }
            res.json({ factura });
        } catch (error) {
            console.error('Error al obtener la factura por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getFacturasActivas: async (req, res) => {
        try {
            const facturas = await Factura.find({ estado: 1 })
            res.json({ facturas });
        } catch (error) {
            console.error('Error al obtener las facturas activas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getFacturasInactivas: async (req, res) => {
        try {
            const facturas = await Factura.find({ estado: 0 })
            res.json({ facturas });
        } catch (error) {
            console.error('Error al obtener las facturas inactivas:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    postFactura: async (req, res) => {
        try {
            const { idinventario, idcomprador, detalle, nombreProducto, cantidad, subtotal, total, iva } = req.body;
            const factura = new Factura({ idinventario, idcomprador, detalle, nombreProducto, cantidad, subtotal, total, iva });
            await factura.save();
            res.json({ message: 'Factura creada satisfactoriamente', factura });
        } catch (error) {
            console.error('Error al crear factura:', error);
            res.status(400).json({ message: 'No se pudo crear la factura' });
        }
    },
    putFactura: async (req, res) => {
        const { id } = req.params;
        try {
            const factura = await Factura.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ factura });
        } catch (error) {
            console.error('Error al actualizar factura:', error);
            res.status(400).json({ message: 'No se pudo actualizar la factura' });
        }
    },
    putFacturaActivar: async (req, res) => {
        const { id } = req.params;
        try {
            const factura = await Factura.findByIdAndUpdate(id, { estado: 1 }, { new: true });
            res.json({ factura });
        } catch (error) {
            console.error('Error al activar factura:', error);
            res.status(400).json({ message: 'No se pudo activar la factura' });
        }
    },
    putFacturaDesactivar: async (req, res) => {
        const { id } = req.params;
        try {
            const factura = await Factura.findByIdAndUpdate(id, { estado: 0 }, { new: true });
            res.json({ factura });
        } catch (error) {
            console.error('Error al desactivar factura:', error);
            res.status(400).json({ message: 'No se pudo desactivar la factura' });
        }
    }
};

export default httpsFactura;

