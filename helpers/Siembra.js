import Siembra from "../models/Siembra.js"

    const helpersSiembra = {
        validarExistaIdSiembra:async (id)=>{
            const existe = await Siembra.findById(id)
            if (existe==undefined){
                throw new Error ("Id de la Siembra no existe")
            }
        }
}

export default helpersSiembra
