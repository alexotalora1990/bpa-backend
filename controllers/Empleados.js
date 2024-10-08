import Empleado from "../models/Empleados.js";
import bcryptjs from "bcryptjs";

const httpsEmpleados = {
    getEmpleados: async (req, res) => {
        try {
            const empleados = await Empleado.find()
            .populate("idfinca")
            res.json({ empleados });
        } catch (error) {
            console.error('Error al obtener los empleados:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getEmpleadoID: async (req, res) => {
        const { id } = req.params;
        try {
            const empleado = await Empleado.findById(id);
            if (!empleado) {
                return res.status(404).json({ message: 'Empleado no encontrado' });
            }
            res.json({ empleado });
        } catch (error) {
            console.error('Error al obtener el empleado por ID:', error);
            res.status(500).json({ message: 'Error interno del servidor' });
        }
    },
    getEmpleadosActivos: async (req, res) => {
        const empleados = await Empleado.find({estado: 1})
        .populate("idfinca")
        res.json({ empleados })
    },
    getEmpleadosInactivos: async (req, res) => {
        const empleados = await Empleado.find({estado: 0})
        .populate("idfinca")
        res.json({ empleados })
    },
    postEmpleados: async (req, res) => {
        try {
            const { nombre,numdocumento ,correo, direccion, telefono, estudios, descripcion, idfinca } = req.body;
            const empleado = new Empleado({ nombre, numdocumento, correo, direccion, telefono, estudios, idfinca, descripcion });
            await empleado.save();
            res.json({ message: 'Empleado creado satisfactoriamente', empleado });
        } catch (error) {
            console.error('Error al crear empleado:', error);
            res.status(400).json({ message: 'No se pudo crear el empleado' });
        }
    },
    putEmpleados: async (req, res) => {
        const { id } = req.params;
        try {
            const empleado = await Empleado.findByIdAndUpdate(id, req.body, { new: true });
            res.json({ empleado });
        } catch (error) {
            console.error('Error al actualizar empleado:', error);
            res.status(400).json({ message: 'No se pudo actualizar el empleado' });
        }
    },
    putEmpleadosActivar: async (req, res) => {
        const { id } = req.params
        const empleado = await Empleado.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ empleado })
    },
    putEmpleadosDesactivar: async (req, res) => {
        const { id } = req.params
        const empleado = await Empleado.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ empleado })
    }
};

export default httpsEmpleados;




