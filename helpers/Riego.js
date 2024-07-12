import Riego from "../models/Riego.JS"

    const helpersRiegos= {
        validarExistaIdRiego:async (id)=>{
            const existe = await Riego.findById(id)
            if (existe==undefined){
                throw new Error ("Id de riego no existe")
            }
        }
}

export default helpersRiegos

