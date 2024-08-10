import mongoose from "mongoose";

const inventarioSchema = new mongoose.Schema({
    tipo:{type:String,required:true},
    observacion:{type:String,required:true},
    unidad:{type:String,required:true},
    cantidad:{type:Number,required:true},
    idsemillas:{type:mongoose.Schema.Types.ObjectId, ref:"Semilla"},
    idinsumos:{type:mongoose.Schema.Types.ObjectId,ref:"Insumo"},
    idmaquinaria:{type:mongoose.Schema.Types.ObjectId,ref:"Maquinaria"},
    estado:{type:Number,default:1}
})


export default mongoose.model("Inventario",inventarioSchema)