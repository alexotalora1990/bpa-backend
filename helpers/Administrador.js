import Administrador from "../models/Administrador.js"

    const helpersAdmin = {
        validarExistaIdAdministrador:async (id)=>{
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
        },
        validarTelefonoUnico:async (telefono) =>{
            const unico = await Administrador.findOne({telefono})
            if(unico){
                throw new Error ("Telefono Existe")
            }
        },
}

export default helpersAdmin 
