import { Router } from "express";
import { check } from 'express-validator';
import httpsClima from '../controllers/Clima.js'
import helpersClima from '../helpers/Clima.js'
import helpersFincas from "../helpers/Fincas.js";
import helpersEmpleado from "../helpers/Empleados.js";
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsClima.getClima);

router.get("/clima/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersClima.validarExistaIdClima),
    validarCampos
], httpsClima.getClimaID);



router.post("/agregar", [
    check('idfinca', 'El id de la finca no es correcto').isMongoId(),
    check('idfinca').custom(helpersFincas.validarExistaIdFinca),
    check('idempleado', 'El id del empleado es obligatorio').isMongoId(),
    check('idempleado').custom(helpersEmpleado.validarExistaIdEmpleados),

    check('horaInicio', 'La hora de inicio es obligatoria').notEmpty(),
    check('horaFinal', 'La hora Final es obligatoria').notEmpty(),
    check('tempMax', 'La temperatura Maxima es obligatoria').notEmpty(),
    check('tempMin', 'La temperatura Minima es obligatoria').notEmpty(),
    validarCampos
], httpsClima.postClima);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersClima.validarExistaIdClima),
   
], httpsClima.getClima);



export default router;
