import express from "express"
import 'dotenv/config'
import dbConexion from "./database/cnxmongoose.js"
import cors from "cors"

import administrador from "./routes/Administrador.js"
import fincas from "./routes/Fincas.js"
import preparacionSuelo from "./routes/PreparacionSuelo.js"
import empleados from "./routes/Empleados.js"
import proveedor from "./routes/Proveedores.js"
import parcelas from "./routes/Parcelas.js"
import analisisSuelo from "./routes/AnalisisSuelo.js"
import cultivos from "./routes/Cultivos.js"
import analisisSuelos from "./routes/AnalisisSuelo.js"
import procesos from "./routes/Procesos.js"
import produccion from "./routes/Produccion.js"
import controlPlagas from "./routes/ControlPlagas.js"
import clima from "./routes/Clima.js"
import comprador from "./routes/Comprador.js"
import elaboracionSustrato from "./routes/ElaboracionSustrato.js"
import factura from "./routes/Factura.js"
import fertilizacion from "./routes/Fertilizacion.js"
import gastos from "./routes/Gastos.js"
import insumos from "./routes/Insumos.js"
import semillas from "./routes/Semillas.js"
import riegos from "./routes/Riego.js"
import siembras from "./routes/Siembra.js"
import nominas from "./routes/Nomina.js"
import maquinarias from "./routes/MaquinariaHerramientas.js"
import mantenimientos from "./routes/Mantenimientos.js"
// import inventarios from "./routes/Inventarios.js"

// actualizacion


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'));

/////////////////////////////////////////////////////////////////

app.use("/api/administrador", administrador)
app.use("/api/finca", fincas)
app.use("/api/empleado", empleados)
app.use("/api/proveedor", proveedor)
app.use("/api/parcela", parcelas)
app.use("/api/preparacionSuelo", preparacionSuelo)
app.use("/api/analisis", analisisSuelo)
app.use("/api/cultivo", cultivos)
app.use("/api/analisisSuelo", analisisSuelos)
app.use("/api/procesos", procesos)
app.use("/api/produccion", produccion)
app.use("/api/controlPlagas", controlPlagas)
app.use("/api/clima", clima)
app.use("/api/comprador", comprador)
app.use("/api/elaboracionSustrato", elaboracionSustrato)
app.use("/api/factura", factura)
app.use("/api/fertilizacion", fertilizacion)
app.use("/api/gastos", gastos)
app.use("/api/insumos", insumos)
app.use("/api/semillas", semillas)
app.use("/api/riego", riegos)
app.use("/api/siembra", siembras)
app.use("/api/nomina", nominas)
app.use("/api/maquinaria", maquinarias)
app.use("/api/mantenimientos", mantenimientos)
// app.use("/api/inventarios", inventarios)



app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    dbConexion()
})
