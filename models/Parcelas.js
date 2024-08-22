import mongoose from "mongoose";

const parcelasSchema = new mongoose.Schema({
    idfincas:{type:mongoose.Schema.Types.ObjectId,ref:'Finca',required:true},
    numero:{type:Number,required:true},
    ubicacion:{
        latitud:{type:String},
        longitud:{type:String}
    },
    cultivoAnterior:{type:String,required:true},
    cultivoActual:{type:String,required:true},
    descripcion:{type:String,required:true},
    area:{type:Number,required:true},
    asistenteTecnico:{type:String,required:true},
    estado:{type:Number,default:1}
})


export default mongoose.model("Parcela",parcelasSchema)