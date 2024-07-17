import { Router } from "express";
import { check } from 'express-validator';
import httpsGasto from "../controllers/Gastos.js";
import helpersGasto from "../helpers/Gastos.js";
import helpersInsumo from "../helpers/Insumos.js";
import helpersSemilla from "../helpers/Semillas.js";
import helpersMantenimiento from "../helpers/Mantenimientos.js";
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsGasto.getGastos);

router.get("/gasto/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersGasto.validarExistaIdGasto),
    validarCampos
], httpsGasto.getGastoID);

router.get("/activos", httpsGasto.getGastosActivos);

router.get("/inactivos", httpsGasto.getGastosInactivos);

router.post("/agregar", [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').isDate(),
    check('numfactura', 'El número de factura es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('idinsumos', 'El id de insumos es obligatorio').isMongoId(),
    check('idinsumos').custom(helpersInsumo.validarExistaIdInsumo),
    check('idsemillas', 'El id de semillas es obligatorio').isMongoId(),
    check('idsemilas').custom(helpersSemilla.validarExistaIdSemilla),
    check('idmantenimiento', 'El id de mantenimiento es obligatorio').isMongoId(),
    check('idmantenimientos').custom(helpersMantenimiento.validarExistaIdMantenimiento),
    validarCampos
], httpsGasto.postGasto);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('nombre', 'El nombre debe ser un string').optional().isString(),
    check('fecha', 'La fecha debe ser una fecha válida').optional().isDate(),
    check('numfactura', 'El número de factura debe ser un string').optional().isString(),
    check('descripcion', 'La descripción debe ser un string').optional().isString(),
    check('idinsumos', 'El id de insumos es obligatorio').isMongoId(),
    check('idinsumos').custom(helpersInsumo.validarExistaIdInsumo),
    check('idsemillas', 'El id de semillas es obligatorio').isMongoId(),
    check('idsemilas').custom(helpersSemilla.validarExistaIdSemilla),
    check('idmantenimiento', 'El id de mantenimiento es obligatorio').isMongoId(),
    check('idmantenimientos').custom(helpersMantenimiento.validarExistaIdMantenimiento),
    validarCampos
], httpsGasto.putGasto);

router.put("/activar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsGasto.putGastoActivar);

router.put("/desactivar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsGasto.putGastoDesactivar);

export default router;
