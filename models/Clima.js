import mongoose from "mongoose";

const climaSchema=new mongoose.Schema({
    idfincas: {type: mongoose.Schema.Types.ObjectId, ref: 'Finca', required: true},
    idempleado: {type: mongoose.Schema.Types.ObjectId, ref: 'Empleado', required: true},
    tipo:{type:String,required:true},
    horaInicio:{type:String},
    horaFinal:{type:String},
    tempMin:{type:Number}, 
    tempMax:{type:Number},
    createAt: {type: Date, default: Date.now}
})

export default mongoose.model("Clima",climaSchema)