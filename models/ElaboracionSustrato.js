import mongoose from "mongoose";

const elaboracionSchema = new mongoose.Schema({
   idproceso:{type:mongoose.Schema.Types.ObjectId,ref:'Proceso',required: true },
   fecha:{type:Date, default:Date.now},
   productocomerdial: {type:String, required:true},
   ingredienteActivo:{type:String, required:true, },
   dosisUtilizada:{type:String, required:true},
    MetodoAplicacion:{type:String, required:true},
    idempleadooperario:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required: true},
    idempleadoresponsable: {type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required: true},
    estado:{type:Number,default:1}
})

export default mongoose.model("ElaboracionSustrato", elaboracionSchema)

