import { Router } from "express";
import { check } from 'express-validator';
import httpsElaboracionSustrato from "../controllers/ElaboracionSustrato.js";
import helpersElaboracionSustrato from "../helpers/ElaboracionSustrato.js"

import helpersCultivo from "../helpers/Cultivos.js"
import helpersEmpleado from "../helpers/Empleados.js";
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsElaboracionSustrato.getElaboraciones);

router.get("/elaboracion/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersElaboracionSustrato.validarExistaIdElaboracionSustrato),
    validarCampos
], httpsElaboracionSustrato.getElaboracionID);

router.get("/obtener/activos", httpsElaboracionSustrato.getElaboracionesActivas);

router.get("/obtener/desactivados", httpsElaboracionSustrato.getElaboracionesInactivas);

router.post("/agregar", [
    check('idcultivo', 'El id de cultivo es obligatorio').isMongoId(),
    check('idcultivo').custom(helpersCultivo.validarExistaIdcultivo),
    check('productocomercial', 'El producto comercial es obligatorio').isString(),
    check('ingredienteActivo', 'El ingrediente activo es obligatorio').isString(),
    check('dosisUtilizada', 'La dosis utilizada es obligatoria').isString(),
    check('metodoAplicacion', 'El método de aplicación es obligatorio').isString(),
    check('idempleadooperario', 'El id del empleado operario es obligatorio').isMongoId(),
    check('idempleadooperario').custom(helpersEmpleado.validarExistaIdEmpleados),
    check('idempleadoresponsable', 'El id del empleado responsable es obligatorio').isMongoId(),
    check('idempleadoresponsable').custom(helpersEmpleado.validarExistaIdEmpleados),
    validarCampos
], httpsElaboracionSustrato.postElaboracion);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersElaboracionSustrato.validarExistaIdElaboracionSustrato),
    
    validarCampos 
], httpsElaboracionSustrato.putElaboracion);

router.put("/activar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsElaboracionSustrato.putElaboracionActivar);

router.put("/desactivar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsElaboracionSustrato.putElaboracionDesactivar);

export default router;



