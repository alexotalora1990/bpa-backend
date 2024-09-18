import Semilla from "../models/Semillas.js";

const helpersSemilla = {
    validarExistaIdSemilla: async (id) => {
        const existe = await Semilla.findById(id);
        if (!existe) {
            throw new Error("El ID de la semilla no existe");
        }
    },
    validarRegistroICAUnico: async (registroica, { req }) => {
        const semilla = await Semilla.findOne({ registroica });
        if (semilla && semilla._id.toString() !== req.params.id) {
            throw new Error("El registro ICA ya existe");
        }
    },
    
    validarRegistroINVIMAUnico: async (registroinvima, { req }) => {
        const semilla = await Semilla.findOne({ registroinvima });
        if (semilla && semilla._id.toString() !== req.params.id) {
            throw new Error("El registro INVIMA ya existe");
        }
    }
};

export default helpersSemilla;

