import ControlPlagas from "../models/ControlPlagas.js"

    const helpersControlPlagas = {
        validarExistaIdControlPlagas:async (id)=>{
            const existe = await ControlPlagas.findById(id)
            if (existe==undefined){
                throw new Error ("Id del empleado no existe")
            }
        }
}

export default helpersControlPlagas



