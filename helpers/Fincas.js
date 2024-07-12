import Finca from "../models/Fincas.js"

    const helpersFincas= {
        validarExistaIdFinca:async (id)=>{
            const existe = await Finca.findById(id)
            if (existe==undefined){
                throw new Error ("Id de Finca no existe")
            }
        }
}

export default helpersFincas

