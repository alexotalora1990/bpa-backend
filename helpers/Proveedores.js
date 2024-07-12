import Proveedor from "../models/Empleados.js"

    const helpersProveedor = {
        validarExistaIdProveedor:async (id)=>{
            const existe = await Proveedor.findById(id)
            if (existe==undefined){
                throw new Error ("Id del cliente no existe")
            }
        },
        validarCorreoUnico:async (correo) =>{
            const unico = await Proveedor.findOne({correo})
            if(unico){
                throw new Error ("Correo Existe")
            }
        }
}

export default helpersProveedor
