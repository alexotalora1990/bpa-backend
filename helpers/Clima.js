import Clima from "../models/Clima.js"

    const helpersClima  = {
        validarExistaIdClima :async (id)=>{
            const existe = await Clima .findById(id)
            if (existe==undefined){
                throw new Error ("Id de clima  no existe")
            }
        }
}

export default helpersClima