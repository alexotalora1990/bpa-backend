import mongoose from "mongoose";
const gastoSchema = new mongoose.Schema({
    nombre:{type:String,required:true},
    fecha:{type:Date,required:true},
    numfactura:{type:String,required:true},
    descripcion:{type:String,required:true},
    idinsumos:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Insumo"},//aqui se trae el total de insumos
    idsemillas:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Semilla"},
    idmatenimiento:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Mantenimiento"},
    estado:{type:Number,default:1}
})


export default mongoose.model("Gasto",gastoSchema)