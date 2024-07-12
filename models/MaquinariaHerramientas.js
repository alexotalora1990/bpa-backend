import mongoose from "mongoose";

const maquinariaSchema = new mongoose.Schema({
    idproveedores:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Proveedor"},
    nombre:{type:String,required:true},
    tipo:{type:String,required:true},
    observaciones:{type:String,required:true},
    cantidad:{type:Number,required:true},
    Total:{type:Number,required:true},
    fechaCompra:{type:Date,default:Date.now},
    estado:{type:Number,default:1}
})
 

export default mongoose.model("Maquinaria",maquinariaSchema)