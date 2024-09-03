import mongoose from "mongoose";

const produccionSchema = new mongoose.Schema({
    idcultivo:{ type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },
    fecha:{type:Date,default:Date.now},
    Numlote:{type: String,required:true},
    especie:{type: String,required:true},
    cantidad:{type: Number,required:true},
    cantidadTrabajadores:{type: Number,required:true},
    observaciones:{type: String,required:true},
    estado:{type:Number,default:1}
})
 
export default mongoose.model("Produccion", produccionSchema) 