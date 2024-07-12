import { Router } from "express";
import { check } from 'express-validator';
import httpsInsumo from "../controllers/Insumo.js";
import helpersInsumo from "../helpers/Insumos.js"
import helpersProveedor from "../helpers/Proveedores.js"
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsInsumo.getInsumos);

router.get("/insumo/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersInsumo.validarExistaIdInsumo),
    validarCampos
], httpsInsumo.getInsumoID);

router.get("/activos", httpsInsumo.getInsumosActivos);

router.get("/desactivados", httpsInsumo.getInsumosInactivos);

router.post("/agregar", [
    check('idproveedor', 'El id del proveedor es obligatorio').isMongoId(),
    check('idproveedor').custom(helpersProveedor.validarExistaIdProveedor),
    check('nombre', 'El nombre es obligatorio').isString(),
    check('relacion', 'La relación es obligatoria').isString(),
    check('cantidad', 'La cantidad debe ser un número válido').isNumeric(),
    check('unidad', 'La unidad es obligatoria').isString(),
    check('responsable', 'El responsable es obligatorio').isString(),
    check('observaciones', 'Las observaciones son obligatorias').isString(),
    check('total', 'El total debe ser un número válido').isNumeric(),
    validarCampos
], httpsInsumo.postInsumo);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('idproveedor', 'El id del proveedor debe ser un ID válido').optional().isMongoId(),
    check('idproveedor').custom(helpersProveedor.validarExistaIdProveedor),
    check('nombre', 'El nombre debe ser un string').optional().isString(),
    check('relacion', 'La relación debe ser un string').optional().isString(),
    check('cantidad', 'La cantidad debe ser un número válido').optional().isNumeric(),
    check('unidad', 'La unidad debe ser un string').optional().isString(),
    check('responsable', 'El responsable debe ser un string').optional().isString(),
    check('observaciones', 'Las observaciones deben ser un string').optional().isString(),
    check('total', 'El total debe ser un número válido').optional().isNumeric(),
    validarCampos
], httpsInsumo.putInsumo);

router.put("/activar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsInsumo.putInsumoActivar);

router.put("/desactivar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsInsumo.putInsumoDesactivar);

export default router;
