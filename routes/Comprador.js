import { Router } from "express";
import { check } from 'express-validator';
import httpsComprador from "../controllers/Comprador.js";
import helpersComprador from "../helpers/Comprador.js";
import helpersProduccion from "../helpers/Produccion.js";
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsComprador.getCompradores);

router.get("/comprador/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersComprador.validarExistaIdComprador),
    validarCampos
], httpsComprador.getCompradorID);

router.get("/activos", httpsComprador.getCompradoresActivos);

router.get("/desactivados", httpsComprador.getCompradoresInactivos);

router.post("/agregar", [
    check('idproduccion', 'El id de la producción es obligatorio').isMongoId(),
    check('idproduccion').custom(helpersProduccion.validarExistaIdProduccion),
    check('especie', 'La especie es obligatoria').isString(),
    check('nombre', 'El nombre es obligatorio').isString(),
    check('telefono', 'El teléfono es obligatorio').isString(),
    check('cantidad', 'La cantidad debe ser un número válido').isNumeric(),
    check('numguiaTransporte', 'El número de guía de transporte es obligatorio').isString(),
    check('numloteComercial', 'El número de lote comercial es obligatorio').isString(),
    check('valor', 'El valor debe ser un número válido').optional().isNumeric(),
    validarCampos
], httpsComprador.postComprador);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersComprador.validarExistaIdComprador),
    check('idproduccion', 'El id de la producción debe ser un ID válido').optional().isMongoId(),
    check('idproduccion').custom(helpersProduccion.validarExistaIdProduccion),
    check('especie', 'La especie debe ser un string').optional().isString(),
    check('nombre', 'El nombre debe ser un string').optional().isString(),
    check('telefono', 'El teléfono debe ser un string').optional().isString(),
    check('cantidad', 'La cantidad debe ser un número válido').optional().isNumeric(),
    check('numguiaTransporte', 'El número de guía de transporte debe ser un string').optional().isString(),
    check('numloteComercial', 'El número de lote comercial debe ser un string').optional().isString(),
    check('valor', 'El valor debe ser un número válido').optional().isNumeric(),
    validarCampos
], httpsComprador.putComprador);

router.put("/activar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsComprador.putCompradorActivar);

router.put("/desactivar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsComprador.putCompradorDesactivar);

export default router;
