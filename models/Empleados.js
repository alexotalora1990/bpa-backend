import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
    nombre:{type:String,required:true},
    numdocumento:{type:String,required:true},
    correo:{type:String,required:true},
    direccion:{type:String,required:true},
    telefono:{type:String,required:true},
    estudios:{type:String,required:true},
    descripcion:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    estado:{type:Number,default:1}
})


export default mongoose.model("Empleado",empleadoSchema)