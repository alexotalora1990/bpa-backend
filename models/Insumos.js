import mongoose from "mongoose";

const insumoSchema = new mongoose.Schema({
    idfinca:{type:mongoose.Schema.Types.ObjectId,ref:'Finca',required:true},
    nombre:{type:String,required:true},
    registroica:{type:String},
    registroinvima:{type:String},
    unidad:{type:String,required:true},
    relacion:{type:String,required:true},
    observaciones:{type:String,required:true},
    cantidad:{type:Number,required:true}, 
    estado:{type:Number,default:1}
})


export default mongoose.model("Insumo",insumoSchema)
