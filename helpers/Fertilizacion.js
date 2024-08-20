import Fertilizacion from "../models/Fertilizacion.js";

    const helpersFertilizacion= {
        validarExistaIdFertlizacion:async (id)=>{
            const existe = await Fertilizacion.findById(id)
            if (existe==undefined){
                throw new Error ("Id de Fertlizacion no existe")
            }
        }
}

export default helpersFertilizacion