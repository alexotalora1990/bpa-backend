import { Router } from "express";
import { check } from 'express-validator';
import httpsFactura from "../controllers/Factura.js";
import helpersFactura from "../helpers/Factura.js";
import helpersInventario from "../helpers/Inventarios.js";
import helpersComprador from "../helpers/Comprador.js";
import { validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/", httpsFactura.getFacturas);

router.get("/factura/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersFactura.validarExistaIdFactura),
    validarCampos
], httpsFactura.getFacturaID);

router.get("/activas", httpsFactura.getFacturasActivas);

router.get("/inactivas", httpsFactura.getFacturasInactivas);

router.post("/agregar", [
    check('idinventario', 'El id de inventario es obligatorio').isMongoId(),
    check('idinventario').custom(helpersInventario.validarExistaIdInventario),
    check('idcomprador', 'El id del comprador es obligatorio').isMongoId(),
    check('idcomprador').custom(helpersComprador.validarExistaIdComprador),
    check('detalle', 'El detalle es obligatorio').isString(),
    check('nombreProducto', 'El nombre del producto es obligatorio').isString(),
    check('cantidad', 'La cantidad debe ser un número válido').isNumeric(),
    check('subtotal', 'El subtotal debe ser un número válido').isNumeric(),
    validarCampos
], httpsFactura.postFactura);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersFactura.validarExistaIdFactura),
    check('idinventario', 'El id de inventario debe ser un ID válido').optional().isMongoId(),
    check('idinventario').custom(helpersInventario.validarExistaIdInventario),
    check('idcomprador', 'El id del comprador debe ser un ID válido').optional().isMongoId(),
    check('idcomprador').custom(helpersComprador.validarExistaIdComprador),
    check('detalle', 'El detalle debe ser un string').optional().isString(),
    check('nombreProducto', 'El nombre del producto debe ser un string').optional().isString(),
    check('cantidad', 'La cantidad debe ser un número válido').optional().isNumeric(),
    check('subtotal', 'El subtotal debe ser un número válido').optional().isNumeric(),
    check('total', 'El total debe ser un número válido').optional().isNumeric(),
    check('iva', 'El IVA debe ser un número válido').optional().isNumeric(),
    validarCampos
], httpsFactura.putFactura);

router.put("/activar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsFactura.putFacturaActivar);

router.put("/desactivar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsFactura.putFacturaDesactivar);

export default router;
