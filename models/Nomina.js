import mongoose from "mongoose";

const nominaSchema = new mongoose.Schema({
    fecha:{type:Date,required:true},
    idempleados:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Empleado"},
    tipo:{type:String,required:true},
    valor:{type:Number,required:true},
    estado:{type:Number,default:1}
})


export default mongoose.model("Nomina",nominaSchema)