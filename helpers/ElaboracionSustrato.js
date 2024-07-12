import ElaboracionSustrato from "../models/ElaboracionSustrato.js"

    const helpersElaboracionSustrato = {
        validarExistaIdElaboracionSustrato:async (id)=>{
            const existe = await ElaboracionSustrato.findById(id)
            if (existe==undefined){
                throw new Error ("Id de la elaboracion del sustrato no existe")
            }
        }
}

export default helpersElaboracionSustrato 