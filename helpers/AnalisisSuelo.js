import AnalisisSuelo from "../models/AnalisisSuelo.js"

    const helpersAnalisisSuelo  = {
        validarExistaIdAnalisisSuelo :async (id)=>{
            const existe = await AnalisisSuelo .findById(id)
            if (existe==undefined){
                throw new Error ("Id del Analisis de Suelo  no existe")
            }
        }
}

export default helpersAnalisisSuelo 