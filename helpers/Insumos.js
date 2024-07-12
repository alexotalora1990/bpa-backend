import Insumo from "../models/Insumos.js"

    const helpersInsumo = {
        validarExistaIdInsumo:async (id)=>{
            const existe = await Insumo.findById(id)
            if (existe==undefined){
                throw new Error ("Id del Insumo no existe")
            }
        }
}

export default helpersInsumo


