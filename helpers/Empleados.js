import Empleado from "../models/Empleados.js"

    const helpersEmpleado = {
        validarExistaIdEmpleados:async (id)=>{
            const existe = await Empleado.findById(id)
            if (existe==undefined){
                throw new Error ("Id del empleado no existe")
            }
        },
        validarCorreoUnico:async (correo) =>{
            const unico = await Empleado.findOne({correo})
            if(unico){
                throw new Error ("Correo Existe")
            }
        }
}

export default helpersEmpleado