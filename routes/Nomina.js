import { Router } from "express";
import { check } from 'express-validator';
import httpsNomina from "../controllers/Nomina.js";
import helpersNomina from "../helpers/Nomina.js";
import  {validarCampos } from '../middleware/validar-campos.js';
import helpersEmpleado from "../helpers/Empleados.js";


const router = Router();

router.get("/", httpsNomina.getNominas);
router.get("/nomina/:id",[
    check("id","ID de nomina invalido").isMongoId(),
    check("id").custom(helpersNomina.validarExistaIdNomina),
    validarCampos
],httpsNomina.getNominaID);
router.get("/obt/activos", httpsNomina.getNominaActivos);
router.get("/obt/desactivados", httpsNomina.getNominaInactivos);
// router.get("/fechas", httpNomina.getNomina);
// router.get("/empleado", httpNomina.getNomina);
// router.get("/nomina", httpNomina.getNomina);

router.post("/agregar",[
    check("fecha","La fecha es requerida").notEmpty(),
    check("tipo","El tipo de nomina es requerido").notEmpty(),
    check("valor","El valor es requerido").notEmpty(),
    check("valor","El valor debe ser numerico").isNumeric(),
    check("idempleados").custom(helpersEmpleado.validarExistaIdEmpleados),
], httpsNomina.postNomina);
router.put("/actualizar/:id",[
    check("fecha","La fecha es requerida").notEmpty(),
    check("tipo","El tipo de nomina es requerido").notEmpty(),
    check("valor","El valor es requerido").notEmpty(),
    check("valor","El valor debe ser numerico").isNumeric(),
    check("idempleados").custom(helpersEmpleado.validarExistaIdEmpleados),
], httpsNomina.putNomina);


router.put("/activar/:id", httpsNomina.putNominaActivar);
router.put("/desactivar/:id", httpsNomina.putNominaDesactivar);
router.put("/actualizar",[], httpsNomina.putNomina);

export default router;