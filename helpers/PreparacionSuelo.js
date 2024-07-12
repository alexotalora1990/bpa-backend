import PreparacionSuelo from "../models/PreparacionSuelo.js"

    const helpersPreparacionSuelo= {
        validarExistaIdPreparacion:async (id)=>{
            const existe = await PreparacionSuelo.findById(id)
            if (existe==undefined){
                throw new Error ("Id de Preparacion no existe")
            }
        }
}

export default helpersPreparacionSuelo

