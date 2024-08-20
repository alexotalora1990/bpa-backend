import Siembra from "../models/Siembra.js"

    const helpersSiembra = {
        validarExistaIdSiembra:async (id)=>{
            const existe = await Siembra.findById(id)
            if (existe==undefined){

                throw new Error ("Id de siembra no existe")

            }
        }
}

export default helpersSiembra
