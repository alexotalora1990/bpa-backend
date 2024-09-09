import { Router } from "express";
import { check } from 'express-validator';
import httpsControlPlagas from "../controllers/ControlPlagas.js";
import helpersControlPlagas from "../helpers/ControlPlagas.js";
import helpersEmpleado from "../helpers/Empleados.js";
import helpersCultivo from "../helpers/Cultivos.js"
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsControlPlagas.getControlPlagas);

router.get("/controlPlagas/:id", [
    check('id', 'No es un ID valido').isMongoId(),
    check("id").custom(helpersControlPlagas.validarExistaIdControlPlagas),
    validarCampos
], httpsControlPlagas.getControlPlagaID);

router.get("/obtener/activos", httpsControlPlagas.getControlPlagasActivos);

router.get("/obtener/desactivados", httpsControlPlagas.getControlPlagasInactivos);

router.post("/agregar", [
    check('idcultivo', 'El idcultivo es obligatorio').isMongoId(),
    check("idcultivo").custom(helpersCultivo.validarExistaIdcultivo),
    check('idempleado', 'El idempleado es obligatorio').isMongoId(),
    check("idempleado").custom(helpersEmpleado.validarExistaIdEmpleados),
    check('idoperario', 'El idadministrador es obligatorio').isMongoId(),
    check("idoperario").custom(helpersEmpleado.validarExistaIdEmpleados),
    check('nombre', 'El nombre es obligatorio y debe tener al menos 4 caracteres').isString().isLength({ min: 4 }),
    check('ingredienteActivo', 'El ingrediente activo es obligatorio').isString(),
    check('dosis', 'La dosis es obligatoria ').isString(),
    validarCampos
], httpsControlPlagas.postControlPlagas);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check("id").custom(helpersControlPlagas.validarExistaIdControlPlagas),
  
    validarCampos
], httpsControlPlagas.putControlPlagas);

router.put("/activar/:id", [
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], httpsControlPlagas.putControlPlagasActivar);

router.put("/desactivar/:id", [
    check('id', 'No es un ID valido').isMongoId(),
    validarCampos
], httpsControlPlagas.putControlPlagasDesactivar);

export default router; 