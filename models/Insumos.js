import mongoose from "mongoose";

const insumoSchema = new mongoose.Schema({
    idproveedor:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Proveedor"},
    nombre:{type:String,required:true},
    relacion:{type:String,required:true},
    cantidad:{type:Number,required:true},
    unidad:{type:String,required:true},
    responsable:{type:String,required:true},
    observaciones:{type:String,required:true},
    cantidad:{type:Number,required:true},
    total:{type:Number,required:true}, 
    estado:{type:Number,default:1}
})


export default mongoose.model("Insumo",insumoSchema)
