import { Router } from "express";
import { check } from 'express-validator';
import httpSemillas from "../controllers/Semillas.js"
import  {validarCampos } from '../middleware/validar-campos.js';
import helpersFinca from "../helpers/Fincas.js"
import helpersSemilla from "../helpers/Semillas.js";


const router = Router();

router.get("/", httpSemillas.getSemillas);


router.get("/produccion/:id",[
    check("id","ID de semillas invalido").isMongoId(),
    check("id").custom(helpersSemilla.validarExistaIdSemilla),
    validarCampos
], httpSemillas.getSemillaID);


router.get("/obtener/activos", httpSemillas.getSemillasActivas);


router.get("/obtener/desactivados", httpSemillas.getSemillasInactivas);


router.post("/agregar", [
    check("idfincas", "El id de la finca es requerido").notEmpty(),
    check("idfincas", "ID de finca es inválido").isMongoId(),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("registroica", "El registro ICA es requerido").notEmpty(),
    check("registroica").custom(helpersSemilla.validarRegistroICAUnico),
    check("registroinvima", "El registro INVIMA es requerido").notEmpty(),
    check("registroinvima").custom(helpersSemilla.validarRegistroINVIMAUnico),
    check("fechaVencimiento", "La fecha de vencimiento es requerida").notEmpty(),
    check("especie", "La especie de semillas es requerida").notEmpty(),
    check("NumLote", "El número de lote es requerido").notEmpty(),
    check("origen", "El origen es requerido").notEmpty(),
    check("poderGerminativo", "El poder germinativo es requerido").notEmpty(),
    check("observaciones", "Las observaciones son requeridas").notEmpty(),
    check("cantidad", "La cantidad es requerida").notEmpty(),
    validarCampos,
], httpSemillas.postSemilla);

router.put("/actualizar/:id", [
    check("id", "El id de la semilla es inválido").isMongoId(),
    check("id").custom(helpersSemilla.validarExistaIdSemilla),
    check("idfincas", "El id de la finca es requerido").notEmpty(),
    check("idfincas", "ID de finca es inválido").isMongoId(),
    check("nombre", "El nombre es requerido").notEmpty(),
    check("registroica", "El registro ICA es requerido").notEmpty(),
    check("registroica").custom(helpersSemilla.validarRegistroICAUnico),
    check("registroinvima", "El registro INVIMA es requerido").notEmpty(),
    check("registroinvima").custom(helpersSemilla.validarRegistroINVIMAUnico),
    check("fechaVencimiento", "La fecha de vencimiento es requerida").notEmpty(),
    check("especie", "La especie de semillas es requerida").notEmpty(),
    check("NumLote", "El número de lote es requerido").notEmpty(),
    check("origen", "El origen es requerido").notEmpty(),
    check("poderGerminativo", "El poder germinativo es requerido").notEmpty(),
    check("observaciones", "Las observaciones son requeridas").notEmpty(),
    check("cantidad", "La cantidad es requerida").notEmpty(),
    validarCampos,
], httpSemillas.putSemilla);


router.put("/activar/:id",[
    check("id", "El id de Produccion invalido").isMongoId(),
    check("id").custom(helpersSemilla.validarExistaIdSemilla),
    validarCampos
], httpSemillas.putSemillaActivar);

router.put("/desactivar/:id",[
    check("id", "El id de Produccion invalido").isMongoId(),
    check("id").custom(helpersSemilla.validarExistaIdSemilla),
    validarCampos
], httpSemillas.putSemillaDesactivar);

export default router;