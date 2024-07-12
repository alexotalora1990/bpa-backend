import mongoose from "mongoose";

const facturaSchema = new mongoose.Schema({
    idinventario:{type:mongoose.Schema.Types.ObjectId,ref:'Inventario',required:true},
    idcomprador:{type:mongoose.Schema.Types.ObjectId,ref:'Comprador',required:true},
    createdAt:{type:Date,default:Date.now},
    detalle:{type:String,required:true},
    nombreProducto:{type:String,required:true},
    cantidad:{type:Number,required:true},
    subtotal:{type:Number,required:true},
    total:{type:Number},
    iva:{type:Number},
    estado:{type:Number,default:1}
})


export default mongoose.model("Factura",facturaSchema)
