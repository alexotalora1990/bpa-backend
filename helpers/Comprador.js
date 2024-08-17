import Comprador from "../models/Comprador.js"

    const helpersComprador = {
        validarExistaIdComprador:async (id)=>{
            const existe = await Comprador.findById(id)
            if (existe==undefined){
                throw new Error ("Id del Comprador no existe")
            }
        },
        validarTelefono: async (telefono) => {
            const existe = await Comprador.findOne({ telefono });
            if (existe) {
                throw new Error("El teléfono existe en los registros");
            }
        },
        
        validarNumGuiaTransporte: async (numguiaTransporte) => {
            const existe = await Comprador.findOne({ numguiaTransporte });
            if (existe) {
                throw new Error("El número de guía de transporte existe en los registros");
            }
        },
        validarNumLoteComercial: async (numloteComercial) => {
            const existe = await Comprador.findOne({ numloteComercial });
            if (existe) {
                throw new Error("El número de lote comercial existe en los registros");
            }
        },
        
    }


export default helpersComprador 