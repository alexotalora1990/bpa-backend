import mongoose from "mongoose";

const semillaSchema = new mongoose.Schema({
    idproveedores: { type: mongoose.Schema.Types.ObjectId, ref: 'Proveedores', required: true },
    numFactura:{type: Number,required:true},
    fechaCompra:{type: Date,required:true},
    fechaVencimiento:{type: Date,required:true},
    especie:{type: String,required:true},
    NumLote:{type: Number,required:true},
    origen:{type: String,required:true},
    poderGerminativo:{type: String,required:true},
    unidadtotal:{type: Number,required:true},
    total:{type: Number,required:true},
    estado:{type:Number,default:1}
})

export default mongoose.model("Semilla", semillaSchema)

