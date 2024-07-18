import { Router } from "express";
import { check } from 'express-validator';
import httpsMantenimiento from "../controllers/Mantenimientos.js";
import helpersMantenimiento from "../helpers/Mantenimientos.js";
import helpersGasto from "../helpers/Gastos.js";
import helpersMaquinaria from "../helpers/MaquinariaHerramientas.js";
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsMantenimiento.getMantenimientos);

router.get("/mantenimiento/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersMantenimiento.validarExistaIdMantenimiento),
    validarCampos
], httpsMantenimiento.getMantenimientoID);

router.get("/activos", httpsMantenimiento.getMantenimientosActivos);

router.get("/inactivos", httpsMantenimiento.getMantenimientosInactivos);

router.post("/agregar", [
    check('idgastos', 'El id de gastos es obligatorio').isMongoId(),
    check('idgastos').custom(helpersGasto.validarExistaIdGasto),
    check('idherramienta', 'El id de herramienta es obligatorio').isMongoId(),
    check('idherramienta').custom(helpersMaquinaria.validarExistaIdMaquinaria),
    check('fecha', 'La fecha es obligatoria').isDate(),
    check('verificacionrealizada', 'La verificación realizada es obligatoria').not().isEmpty(),
    check('responsable', 'El responsable es obligatorio').not().isEmpty(),
    check('observaciones', 'Las observaciones son obligatorias').not().isEmpty(),
    validarCampos
], httpsMantenimiento.postMantenimiento);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersMantenimiento.validarExistaIdMantenimiento),
    check('idgastos', 'El id de gastos es obligatorio').isMongoId(),
    check('idgastos').custom(helpersGasto.validarExistaIdGasto),
    check('idherramienta', 'El id de herramienta es obligatorio').isMongoId(),
    check('idherramienta').custom(helpersMaquinaria.validarExistaIdMaquinaria),
    check('fecha', 'La fecha debe ser una fecha válida').optional().isDate(),
    check('verificacionrealizada', 'La verificación realizada debe ser un string').optional().isString(),
    check('responsable', 'El responsable debe ser un string').optional().isString(),
    check('observaciones', 'Las observaciones deben ser un string').optional().isString(),
    validarCampos
], httpsMantenimiento.putMantenimiento);

router.put("/activar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsMantenimiento.putMantenimientoActivar);

router.put("/desactivar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsMantenimiento.putMantenimientoDesactivar);

export default router;
