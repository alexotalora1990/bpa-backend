import { Router } from "express";
import { check } from 'express-validator';
import httpsMaquinaria from "../controllers/MaquinariaHerramientas.js";
import helpersMaquinaria from "../helpers/MaquinariaHerramientas.js"
import helpersProveedor from "../helpers/Proveedores.js"
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsMaquinaria.getMaquinarias);

router.get("/maquinaria/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersMaquinaria.validarExistaIdMaquinaria),
    validarCampos
], httpsMaquinaria.getMaquinariaID);

router.get("/activos", httpsMaquinaria.getMaquinariasActivas);

router.get("/desactivados", httpsMaquinaria.getMaquinariasInactivas);

router.post("/agregar", [
    check('idproveedores', 'El id del proveedor es obligatorio').isMongoId(),
    check('idproveedores').custom(helpersProveedor.validarExistaIdProveedor),
    check('nombre', 'El nombre es obligatorio').isString(),
    check('tipo', 'El tipo es obligatorio').isString(),
    check('observaciones', 'Las observaciones son obligatorias').isString(),
    check('cantidad', 'La cantidad debe ser un número válido').isNumeric(),
    check('Total', 'El total debe ser un número válido').isNumeric(),
    check('fechaCompra', 'La fecha de compra debe ser una fecha válida').optional().isISO8601(),
    validarCampos
], httpsMaquinaria.postMaquinaria);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersMaquinaria.validarExistaIdMaquinaria),
    check('idproveedores', 'El id del proveedor debe ser un ID válido').optional().isMongoId(),
    check('idproveedores').custom(helpersProveedor.validarExistaIdProveedor),
    check('nombre', 'El nombre debe ser un string').optional().isString(),
    check('tipo', 'El tipo debe ser un string').optional().isString(),
    check('observaciones', 'Las observaciones deben ser un string').optional().isString(),
    check('cantidad', 'La cantidad debe ser un número válido').optional().isNumeric(),
    check('Total', 'El total debe ser un número válido').optional().isNumeric(),
    check('fechaCompra', 'La fecha de compra debe ser una fecha válida').optional().isISO8601(),
    validarCampos
], httpsMaquinaria.putMaquinaria);

router.put("/activar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsMaquinaria.putMaquinariaActivar);

router.put("/desactivar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsMaquinaria.putMaquinariaDesactivar);

export default router;


