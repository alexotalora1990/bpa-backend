import Produccion from "../models/Produccion.js";

    const helpersProduccion= {
        validarExistaIdProduccion:async (id)=>{
            const existe = await Produccion.findById(id)
            if (existe==undefined){
                throw new Error ("Id de Produccion no existe")
            }
        }
}

export default helpersProduccion