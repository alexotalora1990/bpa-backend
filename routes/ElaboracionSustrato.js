import { Router } from "express";
import { check } from 'express-validator';
import httpsElaboracionSustrato from "../controllers/ElaboracionSustrato.js";
import helpersElaboracionSustrato from "../helpers/ElaboracionSustrato.js"
import helpersProcesos from "../helpers/Procesos.js"
import helpersEmpleado from "../helpers/Empleados.js";
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsElaboracionSustrato.getElaboraciones);

router.get("/elaboracion/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsElaboracionSustrato.getElaboracionID);

router.get("/activos", httpsElaboracionSustrato.getElaboracionesActivas);

router.get("/desactivados", httpsElaboracionSustrato.getElaboracionesInactivas);

router.post("/agregar", [
    check('idproceso', 'El idproceso es obligatorio').isMongoId(),
    check('idproceso').custom(helpersProcesos.validarExistaIdProceso),
    check('productocomercial', 'El producto comercial es obligatorio').isString(),
    check('ingredienteActivo', 'El ingrediente activo es obligatorio').isString(),
    check('dosisUtilizada', 'La dosis utilizada es obligatoria').isString(),
    check('MetodoAplicacion', 'El método de aplicación es obligatorio').isString(),
    check('idempleadooperario', 'El id del empleado operario es obligatorio').isMongoId(),
    check('idempleadooperario').custom(helpersEmpleado.validarExistaIdEmpleados),
    check('idempleadoresponsable', 'El id del empleado responsable es obligatorio').isMongoId(),
    check('idempleadoresponsable').custom(helpersEmpleado.validarExistaIdEmpleados),
    validarCampos
], httpsElaboracionSustrato.postElaboracion);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('idproceso', 'El idproceso debe ser un ID válido').optional().isMongoId(),
    check('idproceso').custom(helpersProcesos.validarExistaIdProceso),
    check('productocomercial', 'El producto comercial debe ser un string').optional().isString(),
    check('ingredienteActivo', 'El ingrediente activo debe ser un string').optional().isString(),
    check('dosisUtilizada', 'La dosis utilizada debe ser un string').optional().isString(),
    check('MetodoAplicacion', 'El método de aplicación debe ser un string').optional().isString(),
    check('idempleadooperario', 'El id del empleado operario debe ser un ID válido').optional().isMongoId(),
    check('idempleadooperario').custom(helpersEmpleado.validarExistaIdEmpleados),
    check('idempleadoresponsable', 'El id del empleado responsable debe ser un ID válido').optional().isMongoId(),
    check('idempleadooperario').custom(helpersEmpleado.validarExistaIdEmpleados),
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



