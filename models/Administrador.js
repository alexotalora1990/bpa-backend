import mongoose from "mongoose";

const administradorSchema=new mongoose.Schema({
    nombre:{type:String,unique:true,required:true},
    direccion:{type:String,required:true},
    correo:{type:String,unique:true,required:true},
    contrasena:{type:String,require:true},
    telefono:{type:String,unique:true,required:true},
    municipio:{type:String,required:true},
    rol:{type:String,required:true},
    estado:{type:Number,default:1}
}) 

export default mongoose.model("Administrador",administradorSchema)