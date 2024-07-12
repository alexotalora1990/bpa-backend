import mongoose from "mongoose";

const analisisSueloSchema=new mongoose.Schema({
    idparcela:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Parcela"},
    idempleado:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Empleado"},
    muestra:{type:String,required:true},
    cultivo:{type:String,required:true},
    laboratorio:{type:String,requerid:true},
    resultados:[{}],
    recomendaciones:{type:String},
    createdAt:{type:Date,default:Date.now},
    estado:{type:Number,default:1}
})

export default mongoose.model("AnalisisSuelo",analisisSueloSchema)