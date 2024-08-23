import { Router } from "express";
import { check } from 'express-validator';

import { validarCampos } from '../middleware/validar-campos.js';
import {validarJWT } from '../middleware/validar-jwts.js'
 import httpsCultivos from "../controllers/Cultivos.js"
 import helpersCultivo from "../helpers/Cultivos.js"
 import helpersParcelas from "../helpers/Parcelas.js"

 
const router = Router();

router.get("/listar",[
    
], httpsCultivos.getCultivos);

router.get("/:id",[
    check("id", "ID de cultivo inválido").isMongoId(),
    check("id").custom(helpersCultivo.validarExistaIdcultivo),
    validarCampos,
    
], httpsCultivos.getCultivoID);

router.get("/obtener/activos",[
    
],httpsCultivos.getCultivosActivos);
 
router.get("/obtener/desactivados",[ 
   
],httpsCultivos.getCultivosInactivos);



router.post("/agregar",[
check("idparcela","ID parcela no debe estar vacio").notEmpty(),
check("idparcela", "ID de Parcela inválido ").isMongoId(),
check("nombre","nombre no debe estar vacio").notEmpty(),
check("tipo","tipo no debe estar vacio").notEmpty(),
check("idparcela").custom(helpersParcelas.validarExistaIdParcela),
validarCampos,

], httpsCultivos.postCultivo);

router.put("/actualizar/:id",[
    check("id", "ID de Analisis de Suelo inválido").isMongoId(),
    check("id").custom(helpersCultivo.validarExistaIdcultivo),
    validarCampos,
   ], httpsCultivos.putCultivo);

router.put("/activar/:id",[
    check("id", "ID de Analisis de Suelo inválido").isMongoId(),
    check("id").custom(helpersCultivo.validarExistaIdcultivo),
    validarCampos,
    
], httpsCultivos.putActivarCultivo);

router.put("/desactivar/:id",[
    check("id", "ID de Analisis de Suelo inválido").isMongoId(),
    check("id").custom(helpersCultivo.validarExistaIdcultivo),
    validarCampos,
   
], httpsCultivos.putDesactivarCultivo);

export default router;