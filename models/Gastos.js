import mongoose from "mongoose";
const gastoSchema = new mongoose.Schema({
idfinca:{type:mongoose.Schema.Types.ObjectId,ref:'Finca',required:true},
    nombre:{type:String,required:true},
    fecha:{type:Date,required:true},
    numfactura:{type:String,required:true},
    descripcion:{type:String,required:true},
    total:{type:Number, require:true},
    insumos:{
        idproveedor:{type:mongoose.Schema.Types.ObjectId,ref:'Proveedor',required:false},
        idinsumo:{type:mongoose.Schema.Types.ObjectId,ref:'Insumo',required:false},
        unidad:{type:String,require:false},
        totali:{type:Number, require:false},
        cantidad:{type:Number, require:false}
    },
    semillas:{
        idproveedor:{type:mongoose.Schema.Types.ObjectId,ref:'Proveedor',required:false},
        idsemilla:{type:mongoose.Schema.Types.ObjectId,ref:'Semilla',required:false},
        unidad:{type:String,require:false},
        total:{type:Number, require:false},
        cantidad:{type:Number, require:false}
    },
    estado:{type:Number,default:1}
})


export default mongoose.model("Gasto",gastoSchema)