import Cultivo from "../models/Cultivo.js"

    const helpersCultivo = {
        validarExistaIdcultivo:async (id)=>{
            const existe = await Cultivo.findById(id)
            if (existe==undefined){
                throw new Error ("Id del cultivo no existe")
            }
        },        
}
export default helpersCultivo

