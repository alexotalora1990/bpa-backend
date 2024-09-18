import mongoose from "mongoose";

const fincaSchema = new mongoose.Schema({
    idadministrador:{type:mongoose.Schema.Types.ObjectId,ref:'Administrador',required:true},

    nombre:{type:String,required:true},
    rut:{type:String,required:true},
    direccion:{type:String,required:true},
    ubicacion:{
        latitud:{type:String},
        longitud:{type:String}
    },
    area:{type:String,required:true},
    departamento:{type:String,required:true},
    ciudad:{type:String,required:true},
    limites:{
        norte:{type:String },
        sur:{type:String },
        este:{type:String },
        oeste:{type:String }
    },
    documentos:{type:String},
    estado:{type:Number,default:1}
})


export default mongoose.model("Finca",fincaSchema)
