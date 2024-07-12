import Proceso from "../models/Procesos.js"

    const helpersProcesos= {
        validarExistaIdProceso:async (id)=>{
            const existe = await Proceso.findById(id)
            if (existe==undefined){
                throw new Error ("Id de proceso no existe")
            }
        }
}

export default helpersProcesos

