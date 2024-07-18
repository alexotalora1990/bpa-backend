import Inventario from "../models/Inventarios.js"

    const helpersInventario = {
        validarExistaIdInventario:async (id)=>{
            const existe = await Inventario.findById(id)
            if (existe==undefined){
                throw new Error ("Id del Inventario no existe")
            }
        }
}

export default helpersInventario 