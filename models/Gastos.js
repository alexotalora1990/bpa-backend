import mongoose from "mongoose";
const gastoSchema = new mongoose.Schema({
idfinca:{type:mongoose.Schema.Types.ObjectId,ref:'Finca',required:true},
    nombre:{type:String,required:true},
    fecha:{type:Date,required:true},
    numfactura:{type:String,required:true},
    descripcion:{type:String,required:true},
    total:{type:Number, require:true},
    insumos:{
        idproveedor:{type:mongoose.Schema.Types.ObjectId,ref:'Proveedor'},
        idinsumo:{type:mongoose.Schema.Types.ObjectId,ref:'Insumo'},
        unidad:{type:String},
        total:{type:Number},
        cantidad:{type:Number}
    },
    semillas:{
        idproveedor:{type:mongoose.Schema.Types.ObjectId,ref:'Proveedor'},
        idsemilla:{type:mongoose.Schema.Types.ObjectId,ref:'Semilla'},
        unidad:{type:String},
        total:{type:Number},
        cantidad:{type:Number}
    }, 
    estado:{type:Number,default:1}
})


export default mongoose.model("Gasto",gastoSchema)