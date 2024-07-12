import mongoose from "mongoose";

const siembraSchema = new mongoose.Schema({
    idcultivos: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivos', required: true },
    idempleados: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleados', required: true },
    idinventario: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventario', required: true },
    fechasiembra:{type: Date,required:true},
    fechacosecha:{type: Date,required:true},
    transplante:{type: String,required:true}, 
    cultivoanterior:{type: String,required:true},
    estado:{type:Number,default:1}
})

export default mongoose.model("Siembra", siembraSchema)