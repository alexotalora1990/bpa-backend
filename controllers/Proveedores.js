import Proveedor from "../models/Proveedores.js";

const httpsProveedores = {
    
    getProveedores: async (req, res) => {
        try {
            const proveedores = await Proveedor.find();
            res.json({ proveedores });
        } catch (error) {
            console.error('Error al obtener los proveedores:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getProveedoresActivos: async (req, res) => {
        const proveedores = await Proveedor.find({estado: 1})
        res.json({ proveedores })
    },
    getProveedoresInactivos: async (req, res) => {
        const proveedores = await Proveedor.find({estado: 0})
        res.json({ proveedores })
    },
    getProveedorID: async (req, res) => {
        const { id } = req.params;
        try {
            const proveedor = await Proveedor.findById(id);
            if (!proveedor) {
                return res.status(404).json({ message: 'Proveedor no encontrado' });
            }
            res.json({ proveedor });
        } catch (error) {
            console.error('Error al obtener el proveedor por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },

    postProveedor: async (req, res) => {
        try {
            const { nombre, direccion, telefono, correo } = req.body;
            const proveedor = new Proveedor({ nombre, direccion, telefono, correo });
            await proveedor.save();
            res.json({ message: 'Proveedor creado satisfactoriamente', proveedor });
        } catch (error) {
            console.error('Error al crear proveedor:', error);
            res.status(400).json({ message: 'No se pudo crear el proveedor' });
        }
    },
    PutProveedor: async (req, res) => {
        const { id } = req.params;
        const { nombre, direccion, telefono, correo } = req.body;
        try {
            const proveedor = await Proveedor.findByIdAndUpdate(id, { nombre, direccion, telefono, correo }, { new: true });
            if (!proveedor) {
                return res.status(404).json({ message: 'Proveedor no encontrado' });
            }
            res.json({ proveedor });
        } catch (error) {
            console.error('Error al actualizar proveedor:', error);
            res.status(400).json({ message: 'No se pudo actualizar el proveedor' });
        }
    },
    putProveedoresActivar: async (req, res) => {
        const { id } = req.params
        const proveedor = await Proveedor.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ proveedor })
    },
    putProveedoresDesactivar: async (req, res) => {
        const { id } = req.params
        const proveedor = await Proveedor.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ proveedor })
    }

};

export default httpsProveedores;
