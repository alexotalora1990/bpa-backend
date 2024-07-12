import Semilla from "../models/Semillas.js";

    const helpersSemilla= {
        validarExistaIdSemilla:async (id)=>{
            const existe = await Semilla.findById(id)
            if (existe==undefined){
                throw new Error ("Id de Semilla no existe")
            }
        }
}

export default helpersSemilla