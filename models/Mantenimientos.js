import mongoose from "mongoose";

const mantenimientoSchema = new mongoose.Schema({
    idgastos:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Gasto"},
    idherramienta:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"MaquinariaHerramienta"},
    fecha:{type:Date,required:true},
    verificacionrealizada:{type:String,required:true},
    responsable:{type:String,required:true},
    observaciones:{type:String,required:true},
    estado:{type:Number,default:1}
})


export default mongoose.model("Mantenimiento",mantenimientoSchema)