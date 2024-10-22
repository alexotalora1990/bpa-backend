import mongoose from "mongoose";

const semillaSchema = new mongoose.Schema({
    idfincas: { type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true },
    nombre:{type: String,required:true},
    registroica:{type: String,required:true},
    registroinvima:{type: String,required:true},
    fechaVencimiento:{type: Date,required:true},
    especie:{type: String,required:true},
    NumLote:{type: Number,required:true},
    origen:{type: String,required:true},
    poderGerminativo:{type: String,required:true},
    observaciones:{type: String,required:true},
    cantidad:{type: Number,required:true},
    estado:{type:Number,default:1}
}) 


export default mongoose.model("Semilla", semillaSchema)

