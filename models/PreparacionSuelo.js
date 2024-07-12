import mongoose from "mongoose";

const preparacionSueloSchema = new mongoose.Schema({
    fecha:{type:Date,required:true},
    idparcela:{type:mongoose.Schema.Types.ObjectId,ref:'Parcela',required:true},
    idempleado:{type:mongoose.Schema.Types.ObjectId,ref:'Empleado',required:true},
    productos:[{  
        ingredienteActivo:{type:String,required:true},
        dosis:{type:String,required:true},
        metodoAplicacion:{type:String,required:true},
    }],
    operario:{type:String,required:true},
    responsable:{type:String,required:true},
    observaciones:{type:String,required:true},
    estado:{type:Number,default:1}
})


export default mongoose.model("PreparacionSuelo", preparacionSueloSchema)