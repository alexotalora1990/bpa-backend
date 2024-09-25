import mongoose from "mongoose";

const fertilizacionSchema = new mongoose.Schema({
    idcultivo:{type:mongoose.Schema.Types.ObjectId,ref:'Cultivo',required:true},
    idempleado:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    idinsumo:{type:mongoose.Schema.Types.ObjectId,ref:'Insumo',required:true},
    estadoFenologico:{type:String,required:true},
    tipo:{type:String,required:true},
    nombreFertilizante:{type:String,required:true},
    cantidad:{type:Number,required:true},
    createdAt:{type:Date,default:Date.now},
    estado:{type:Number,default:1}
})


export default mongoose.model("Fertilizacion",fertilizacionSchema)
