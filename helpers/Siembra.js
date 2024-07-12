import Siembra from "../models/Administrador.js"

    const helpersSiembra = {
        validarExistaIdSiembra:async (id)=>{
            const existe = await Administrador.findById(id)
            if (existe==undefined){
                throw new Error ("Id del cliente no existe")
            }
        },
        validarCorreoUnico:async (correo) =>{
            const unico = await Administrador.findOne({correo})
            if(unico){
                throw new Error ("Correo Existe")
            }
        }
}

export default helpersAdmin
