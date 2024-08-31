import { Router } from "express";
import { check } from 'express-validator';
import  {validarCampos } from '../middleware/validar-campos.js';
import httpRiegos from "../controllers/Riego.js"
import helpersRiegos from "../helpers/Riego.js";
import helpersCultivo from "../helpers/Cultivos.js";
import helpersEmpleado from "../helpers/Empleados.js";

const router = Router();

router.get("/", httpRiegos.getRiegos);
router.get("riego/:id",[
    check("id","ID de Proceso invalido").isMongoId(),
    check("id").custom(helpersRiegos.validarExistaIdRiego),
    validarCampos
], httpRiegos.getRiegosID);

// router.get("/listarXEmpleados",httpRiegos.getRiegosByEmpleados);
// router.get("/listarXCultivos",httpRiegos.getRiegosByCultivos);
// router.get("/listarEntreFechas",httpRiegos.getRiegosByFechas);


// router.get("/listarCantAgua/:id",htppRiegos.getRiegosByAgua);

router.post("/agregar",[
    check("idcultivo", "El id de Cultivo es requerido").notEmpty(),
    check("idcultivo", "El id de Cultivo es invalido").isMongoId(),
    check("diasTransplante", "Dias de riego es requerido").notEmpty(),
    check("fenologico", "Estado Fenológico es requerido").notEmpty(),
    check("horaInicio", "Hora de inicio es requerida").notEmpty(),
    check("horaFin", "Hora Final es requerida").notEmpty(),
    check("cantidadAgua", "Cantidad de agua es requerida").notEmpty(),
    check("dosis", "Dosis  es requerida").notEmpty(),
    check("idcultivo").custom(helpersCultivo.validarExistaIdcultivo),
    check('idempleado', 'El id del empleado es invalido').isMongoId(),
    check('idempleado').custom(helpersEmpleado.validarExistaIdEmpleados),
    validarCampos
], httpRiegos.postRiego);

router.put("/actualizar",[
    check("id", "El id  es requerido").notEmpty(),
    check("id", "El id es invalido").isMongoId(),

    check("idcultivo", "El id de Cultivo es requerido").notEmpty(),
    check("idempleado", "El id de Empleado es requerido").notEmpty(),
    
    check("id").custom(helpersRiegos.validarExistaIdRiego),
 
    validarCampos
], httpRiegos.putRiego);
 

export default router;
