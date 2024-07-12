import { Router } from "express";
import { check } from 'express-validator';
import httpsProveedores from "../controllers/Proveedores.js";
import helpersProveedores from '../helpers/Proveedores.js';
import  {validarCampos } from '../middleware/validar-campos.js';

const router = Router();

router.get("/",[],httpsProveedores.getProveedores);

router.get("/proveedor/:id",[
    check("id","ID de proveedor invalido").isMongoId(),
    check("id").custom(helpersProveedores.validarExistaIdProveedor),
    validarCampos
],httpsProveedores.getProveedorID);

router.post("/agregar",[
    check("nombre", "El nombre es requerido").notEmpty(),
    check("nombre", "El nombre debe tener al menos 3 caracteres").isLength({ min: 3 }),
    check("correo", "El correo es requerido").notEmpty(),
    check("correo", "Formato de correo electronico invalido").isEmail(),
    check("correo").custom(helpersProveedores.validarCorreoUnico),
    check("direccion", "La direccion es requerida").notEmpty(),
    check("telefono", "el telefono es requerido").notEmpty(),
    validarCampos,
], httpsProveedores.postProveedor);

router.get("/obt/activos",[

],httpsProveedores.getProveedoresActivos);

router.get("/obt/desactivados",[

],httpsProveedores.getProveedoresInactivos);


router.put("/actualizar/:id",[
    check("nombre", "El nombre es requerido").notEmpty(),
    check("nombre", "El nombre debe tener al menos 3 caracteres").isLength({ min: 3 }),
    check("correo", "El correo es requerido").notEmpty(),
    check("direccion", "La direccion es requerida").notEmpty(),
    check("telefono", "el telefono es requerido").notEmpty(),
    validarCampos,
], httpsProveedores.PutProveedor);

router.put("/activar/:id",[
    validarCampos,
],httpsProveedores.putProveedoresActivar);

router.put("/desactivar/:id",[
    validarCampos,
],httpsProveedores.putProveedoresDesactivar);

export default router;