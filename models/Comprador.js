import mongoose from "mongoose";

const compradorSchema=new mongoose.Schema({
    idproduccion:{type:mongoose.Schema.Types.ObjectId,ref:'Produccion',required:true},
    nombre:{type:String,required:true},
    telefono:{type:String,required:true},
    cantidad:{type:Number,required:true},
    numguiaTransporte:{type:String,required:true},
    numloteComercial:{type:String,required:true},
    valor:{type:Number},
    createdAt:{type:Date,default:Date.now},
    estado:{type:Number,default:1}
})

export default mongoose.model("Comprador",compradorSchema)
