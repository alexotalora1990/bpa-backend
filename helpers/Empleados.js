import Empleado from "../models/Empleados.js";

const helpersEmpleado = {
    validarExistaIdEmpleados: async (id) => {
        const existe = await Empleado.findById(id);
        if (!existe) {
            throw new Error("El ID del empleado no existe");
        }
    },
    validarCorreoUnico: async (correo, { req }) => {
        const empleado = await Empleado.findOne({ correo });
        if (empleado && empleado._id.toString() !== req.params.id) {
            throw new Error("El correo ya existe");
        }
    },
    validarDocumentoUnico: async (numdocumento, { req }) => {
        const empleado = await Empleado.findOne({ numdocumento });
        if (empleado && empleado._id.toString() !== req.params.id) {
            throw new Error("El documento ya existe");
        }
    },
    validarTelefonoUnico: async (telefono, { req }) => {
        const empleado = await Empleado.findOne({ telefono });
        if (empleado && empleado._id.toString() !== req.params.id) {
            throw new Error("El teléfono ya existe");
        }
    }
};

export default helpersEmpleado;
