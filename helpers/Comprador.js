import Comprador from "../models/Comprador.js"

    const helpersComprador = {
        validarExistaIdComprador:async (id)=>{
            const existe = await Comprador.findById(id)
            if (existe==undefined){
                throw new Error ("Id del Comprador no existe")
            }
        }
}

export default helpersComprador 