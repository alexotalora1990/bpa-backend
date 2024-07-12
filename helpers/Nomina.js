import Nominda from "../models/Nomina.js"

    const helpersNomina= {
        validarExistaIdNomina:async (id)=>{
            const existe = await Nomina.findById(id)
            if (existe==undefined){
                throw new Error ("Id de la nomina no existe")
            }
        }
}

export default helpersNomina
