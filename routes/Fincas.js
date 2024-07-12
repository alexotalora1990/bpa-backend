import { Router } from "express";
import { check } from 'express-validator';

import httpFincas from "../controllers/Fincas.js";
import  {validarCampos } from '../middleware/validar-campos.js';
import helpersFincas from "../helpers/Fincas.js";
import helpersAdmin from '../helpers/Administrador.js';



const router = Router();

router.get("/", httpFincas.getFincas);


router.get("/fincas/:id",[
    check("id","ID de finca invalido").isMongoId(),
    check("id").custom(helpersFincas.validarExistaIdFinca),
    validarCampos
], httpFincas.getFincasID);


router.get("/obtener/activos", httpFincas.getFincasActivas);


router.get("/obtener/desactivados", httpFincas.getFincasInactivas);


router.post("/agregar",[
    check("idadministrador", "El id de Administrador es requerido").notEmpty(),
    check("idadministrador").custom(helpersAdmin.validarExistaIdAdministrador),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("nombre", "El nombre debe tener al menos 3 caracteres").isLength({ min: 3 }),
    check("rut", "El rut es requerido").notEmpty(),
    check("direccion", "La Dirección es requerido").notEmpty(),
    check("ubicacion", "La Ubicacion es requerida").notEmpty(),
    check("area", "El area es requerida").notEmpty(),
    check("departamento", "Departamento es requerido").notEmpty(),
    check("ciudad", "Ciudad es requerida").notEmpty(),
    check("limites", "El area es requerida").notEmpty(),

validarCampos,
], httpFincas.postFinca);

router.put("/actualizar/:id",[
    check("id", "El id de Finca invalido").isMongoId(),
    check("id").custom(helpersFincas.validarExistaIdFinca),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("nombre", "El nombre debe tener al menos 3 caracteres").isLength({ min: 3 }),
    check("rut", "El rut es requerido").notEmpty(),
    check("direccion", "La Dirección es requerido").notEmpty(),
    check("ubicacion", "La Ubicacion es requerida").notEmpty(),
    check("area", "El area es requerida").notEmpty(),
    check("departamento", "Departamento es requerido").notEmpty(),
    check("ciudad", "Ciudad es requerida").notEmpty(),
    check("limites", "El area es requerida").notEmpty(),
    check("id","ID de finca invalido").isMongoId(),
    check("id").custom(helpersFincas.validarExistaIdFinca),
validarCampos,
], httpFincas.putFinca);


router.put("/activar/:id",[
    check("id","ID de finca invalido").isMongoId(),
    check("id").custom(helpersFincas.validarExistaIdFinca),
], httpFincas.putFincaActivar);
router.put("/desactivar/:id",[
    check("id","ID de finca invalido").isMongoId(),
    check("id").custom(helpersFincas.validarExistaIdFinca),
], httpFincas.putFincaDesactivar);

export default router;