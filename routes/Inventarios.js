import { Router } from "express";
import { check } from 'express-validator';
import httpsInventario from "../controllers/Inventarios.js";
import helpersInventario from "../helpers/Inventarios.js";
import helpersSemilla from "../helpers/Semillas.js";
import helpersInsumo from "../helpers/Insumos.js";
import helpersMaquinaria from "../helpers/MaquinariaHerramientas.js";
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsInventario.getInventarios);

router.get("/inventario/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersInventario.validarExistaIdInventario),
    validarCampos
], httpsInventario.getInventarioID);

router.get("/activos", httpsInventario.getInventariosActivos);

router.get("/inactivos", httpsInventario.getInventariosInactivos);

router.post("/agregar", [
    check('tipo', 'El tipo es obligatorio').isString(),
    check('observacion', 'La observación es obligatoria').isString(),
    check('unidad', 'La unidad es obligatoria').isString(),
    check('cantidad', 'La cantidad debe ser un número válido').isNumeric(),
    check('idsemillas', 'El id de las semillas debe ser un ID válido').optional().isMongoId(),
    check('idsemillas').custom(helpersSemilla.validarExistaIdSemilla),
    check('idinsumos', 'El id de los insumos debe ser un ID válido').optional().isMongoId(),
    check('idinsumos').custom(helpersInsumo.validarExistaIdInsumo),
    check('idmaquinaria', 'El id de la maquinaria debe ser un ID válido').optional().isMongoId(),
    check('idmaquinaria').custom(helpersMaquinaria.validarExistaIdMaquinaria),
    validarCampos
], httpsInventario.postInventario);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersInventario.validarExistaIdInventario),
    check('tipo', 'El tipo debe ser un string').optional().isString(),
    check('observacion', 'La observación debe ser un string').optional().isString(),
    check('unidad', 'La unidad debe ser un string').optional().isString(),
    check('cantidad', 'La cantidad debe ser un número válido').optional().isNumeric(),
    check('idsemillas', 'El id de las semillas debe ser un ID válido').optional().isMongoId(),
    check('idsemillas').custom(helpersSemilla.validarExistaIdSemilla),
    check('idinsumos', 'El id de los insumos debe ser un ID válido').optional().isMongoId(),
    check('idinsumos').custom(helpersInsumo.validarExistaIdInsumo),
    check('idmaquinaria', 'El id de la maquinaria debe ser un ID válido').optional().isMongoId(),
    check('idmaquinaria').custom(helpersMaquinaria.validarExistaIdMaquinaria),
    validarCampos
], httpsInventario.putInventario);

router.put("/activar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersInventario.validarExistaIdInventario),
    validarCampos
], httpsInventario.putInventarioActivar);

router.put("/desactivar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersInventario.validarExistaIdInventario),
    validarCampos
], httpsInventario.putInventarioDesactivar);

export default router;
