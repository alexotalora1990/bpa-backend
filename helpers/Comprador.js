import Comprador from "../models/Comprador.js"

    const helpersComprador = {
        validarExistaIdComprador:async (id)=>{
            const existe = await Comprador.findById(id)
            if (existe==undefined){
                throw new Error ("Id del Comprador no existe")
            }
        },
        validarTelefono: async (telefono, { req }) => {
            const comprador = await Comprador.findOne({ telefono });
            if (comprador && comprador._id.toString() !== req.params.id) {
                throw new Error("El teléfono ya existe en los registros");
            }
        },
        
        validarNumGuiaTransporte: async (numguiaTransporte, { req }) => {
            const comprador = await Comprador.findOne({ numguiaTransporte });
            if (comprador && comprador._id.toString() !== req.params.id) {
                throw new Error("El número de guía de transporte ya existe en los registros");
            }
        },
        
        validarNumLoteComercial: async (numloteComercial, { req }) => {
            const comprador = await Comprador.findOne({ numloteComercial });
            if (comprador && comprador._id.toString() !== req.params.id) {
                throw new Error("El número de lote comercial ya existe en los registros");
            }
        },
    }


export default helpersComprador 