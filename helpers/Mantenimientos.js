import Mantenimiento from "../models/Mantenimientos.js"

    const helpersMantenimiento = {
        validarExistaIdMantenimiento:async (id)=>{
            const existe = await Mantenimiento.findById(id)
            if (existe==undefined){
                throw new Error ("Id del Mantenimiento no existe")
            }
        }
}

export default helpersMantenimiento 