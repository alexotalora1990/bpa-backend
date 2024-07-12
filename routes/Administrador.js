import { Router } from "express";
import { check } from 'express-validator';
import httpAdmin from "../controllers/Administrador.js";
import helpersAdmin from '../helpers/Administrador.js';
import  {validarCampos } from '../middleware/validar-campos.js';
import { validarJWT } from "../middleware/validar-jwts.js";


const router = Router();

router.get("/", [],httpAdmin.getAdmin);
    
router.get("/admin/:id", [
    validarJWT,
    check("id","ID de admin invalido").isMongoId(),
    check("id").custom(helpersAdmin.validarExistaIdAdministrador),
    validarCampos
], httpAdmin.getAdminID);

router.post("/agregar", [
    check("nombre", "El nombre es requerido").notEmpty(),
    check("nombre", "El nombre debe tener al menos 3 caracteres").isLength({ min: 3 }),
    check("direccion", "La direccion es requerida").notEmpty(),
    check("correo", "El correo es requerido").notEmpty(),
    check("correo").custom(helpersAdmin.validarCorreoUnico), 
    check("contrasena", "La contraseña es requerida").notEmpty(),
    check("telefono", "el telefono es requerido").notEmpty(),
    check("municipio", "el municipio es requerido").notEmpty(),
    check("rol", "El rol es requerido").notEmpty(),
    validarCampos,
], httpAdmin.postAdmin);

router.get("/activos",[
],httpAdmin.getAdminActivos);

router.get("/desactivados",[
],httpAdmin.getAdminInactivos);

//actualizar

router.put("/actualizar/:id",[
    check("id", "ID de admin inválido").isMongoId(),
    check("id").custom(helpersAdmin.validarExistaIdAdministrador),
    check("nombre", "El nombre debe tener al menos 4 caracteres").optional().isLength({ min: 4 }),
    check("direccion", "La direccion es requerida").notEmpty(),
    check("correo", "El correo es requerido").notEmpty(),
    check("contrasena", "La contraseña es requerida").notEmpty(),
    check("telefono", "el telefono es requerido").notEmpty(),
    check("municipio", "el municipio es requerido").notEmpty(),
    check("rol", "El rol es requerido").notEmpty(),
    validarCampos,
], httpAdmin.putAdmin);

//activar y desactivar

router.put("/activar/:id",[
    validarJWT,
    check("id", "ID de ADMIN inválido").isMongoId(),
    check("id").custom(helpersAdmin.validarExistaIdAdministrador),
    validarCampos,
],httpAdmin.putAdminActivar);

router.put("/desactivar/:id",[
    validarJWT,
    check("id", "ID de ADMIN inválido").isMongoId(),
    check("id").custom(helpersAdmin.validarExistaIdAdministrador),
    validarCampos,
],httpAdmin.putAdminDesactivar);

router.post("/login",
    [
      check("correo", "El correo es requerido").notEmpty(),
      check("correo", "Formato de correo electronico invalido").isEmail(),
      check("contrasena", "La contrasena es requerida").notEmpty(),
      validarCampos
    ],httpAdmin.login)

export default router;