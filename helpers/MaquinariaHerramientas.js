import Maquinaria from "../models/MaquinariaHerramientas"

    const helpersMaquinaria = {
        validarExistaIdMaquinaria:async (id)=>{
            const existe = await Maquinaria.findById(id)
            if (existe==undefined){
                throw new Error ("Id Maquina/Herramienta no existe")
            }
        }
}

export default helpersMaquinaria 