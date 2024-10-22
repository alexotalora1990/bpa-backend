import { Router } from "express";
import { check } from 'express-validator';

import { validarCampos } from '../middleware/validar-campos.js';
import {validarJWT } from '../middleware/validar-jwts.js'

import httpsAnalisisSuelo from "../controllers/AnalisisSuelo.js"; 

import helpersAnalisisSuelo from "../helpers/AnalisisSuelo.js";
import helpersParcelas from "../helpers/Parcelas.js";
import helpersEmpleado from "../helpers/Empleados.js";

 
const router = Router();

router.get("/",[
    // validarJWT,
], httpsAnalisisSuelo.getAnalisisSuelo);

router.get("/:id",[
    check("id", "ID de Analisis de Suelo inválido").isMongoId(),
    check("id").custom(helpersAnalisisSuelo.validarExistaIdAnalisisSuelo),
    validarCampos,
    // validarJWT,
], httpsAnalisisSuelo.getAnalisisSueloID);

router.get("/obtener/activos",[ 
],httpsAnalisisSuelo.getAnalisisSueloActivos);

router.get("/obtener/desactivados",[
    // validarJWT,
],httpsAnalisisSuelo.getAnalisisSueloInactivos);


router.get("/fechas",[
    // validarJWT,
],httpsAnalisisSuelo.getAnalisisSuelo);

router.get("/porcentaje",[
    // validarJWT,
],httpsAnalisisSuelo.getAnalisisSuelo);

router.get("/responsable",[
    // validarJWT,
],httpsAnalisisSuelo.getAnalisisSuelo);

router.post("/agregar",[
check("idparcela","ID parcela no debe estar vacio").notEmpty(),

check("idparcela", "ID de Parcela inválido ").isMongoId(),
check("idempleado","ID Empleado no debe estar vacio").notEmpty(),
check("idempleado", "ID de Empleado inválido ").isMongoId(),
check("muestra","muestra de Analisis de Suelo no debe estar vacio").notEmpty(),
check("cultivo","cultivo no debe estar vacio").notEmpty(),
check("laboratorio","Laboratorio no debe estar vacio").notEmpty(),
check("recomendaciones","recomendaciones de Analisis no debe estar vacio").notEmpty(),
check("idparcela").custom(helpersParcelas.validarExistaIdParcela),
check("idempleado").custom(helpersEmpleado.validarExistaIdEmpleados),
validarCampos, 
// validarJWT,
], httpsAnalisisSuelo.postAnalisisSuelo);

router.put("/actualizar/:id",[
    check("id", "ID de Analisis de Suelo inválido").isMongoId(),
    check("id").custom(helpersAnalisisSuelo.validarExistaIdAnalisisSuelo),
    validarCampos,
    // validarJWT,
], httpsAnalisisSuelo.putAnalisisSuelo);
router.put("/activar/:id",[
    check("id", "ID de Analisis de Suelo inválido").isMongoId(),
    check("id").custom(helpersAnalisisSuelo.validarExistaIdAnalisisSuelo),
    validarCampos,
    // validarJWT,
], httpsAnalisisSuelo.putActivarAnalisisSuelo);
router.put("/desactivar/:id",[
    check("id", "ID de Analisis de Suelo inválido").isMongoId(),
    check("id").custom(helpersAnalisisSuelo.validarExistaIdAnalisisSuelo),
    validarCampos,
    // validarJWT,
], httpsAnalisisSuelo.putDesactivarAnalisisSuelo);

export default router;