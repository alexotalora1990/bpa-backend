import  express  from "express"
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


const app = express()
app.use(cors())
app.use(express.json())


/////////////////////////////////////////////////////////////////

app.use("/api/administrador",administrador)
app.use("/api/finca",fincas)
app.use("/api/empleado",empleados)
app.use("/api/proveedor",proveedor)
app.use("/api/parcela",parcelas)
app.use("/api/preparacionSuelo",preparacionSuelo)
app.use("/api/analisis",analisisSuelo)



app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    dbConexion()
})
