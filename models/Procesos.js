import mongoose from "mongoose";

const procesoSchema = new mongoose.Schema({
    idcultivo:{type:mongoose.Schema.Types.ObjectId,ref:'Cultivo',required: true },
    idempleado:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required: true },
    tipo:{type: String,required:true},
    descripcion:{type: String,required:true},
    fechaInicio:{type: Date,required:true},
    fechaFinal:{type: Date,required:true},
    estado:{type:Number,default:1}
})

export default mongoose.model("Proceso", procesoSchema)