import mongoose from "mongoose";

const ControlPlagaSchema=new mongoose.Schema({
    idcultivo:{type:mongoose.Schema.Types.ObjectId,ref:'Cultivo',required:true},
    idempleado:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    idoperario:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    createdAt:{type:Date,default:Date.now},
    nombre:{type:String,required:true,minlenght:4},
    ingredienteActivo:{type:String,required:true},
    dosis:{type:Number,required:true},
    observaciones:{type:String},
    estado:{type:Number,default:1}
})

export default mongoose.model("ControlPlagas",ControlPlagaSchema)
