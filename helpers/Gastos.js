import Gasto from "../models/Gastos.js"

    const helpersGasto = {
        validarExistaIdGasto:async (id)=>{
            const existe = await Gasto.findById(id)
            if (existe==undefined){
                throw new Error ("Id del Gasto no existe")
            }
        }
}

export default helpersGasto 