import { Router } from "express";
import { check } from 'express-validator';
import httpsGasto from "../controllers/Gastos.js";
import helpersGasto from "../helpers/Gastos.js";
import helpersInsumo from "../helpers/Insumos.js";
import helpersSemilla from "../helpers/Semillas.js";
import helpersMantenimiento from "../helpers/Mantenimientos.js";
import helpersFincas from "../helpers/Fincas.js";
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
    check('idfinca','El id finca es obligatorio'). isEmpty(),
    check('idfinca','id Finca no es valido').isMongoId,
    check('idfinca').custom(helpersFincas.validarExistaIdFinca),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('fecha', 'La fecha es obligatoria').isDate(),
    check('numfactura', 'El número de factura es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatoria').not().isEmpty(),
    check('total', 'Total es obligatorio').isMongoId(),
   validarCampos
], httpsGasto.postGasto);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
   check('id', 'Id no puede estar vacio'). notEmpty(),
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
