import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
    idfinca:{type: mongoose.Schema.Types.ObjectId,ref: "Finca", required:true},
    nombre:{type: String,required:true},
    correo:{type: String,unique:true,required:true},
    direccion:{type: String,required:true},
    telefono:{type: String,required:true},
    estado:{type:Number,default:1}
})

export default mongoose.model("Proveedor", proveedorSchema)
