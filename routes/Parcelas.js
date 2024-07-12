import { Router } from "express";
import { check } from 'express-validator';

import httpsParcelas from "../controllers/Parcelas.js"
import  {validarCampos } from '../middleware/validar-campos.js';
import helpersParcelas from "../helpers/parcelas.js";
import helpersFincas from "../helpers/Fincas.js"

const router = Router();

router.get("/", httpsParcelas.getParcelas);

router.get("/parcelas/:id",[
    check("id","ID de parcela invalido").isMongoId(),
    check("id").custom(helpersParcelas.validarExistaIdParcela),
    validarCampos
], httpsParcelas.getParcelas);

router.get("/obt/activos", httpsParcelas.getParcelasActivas);
router.get("/obt/desactivados", httpsParcelas.getParcelasInactivas);

router.post("/agregar",[
    check("idfincas", "El ID de la finca es requerido").notEmpty(),
    check("idfincas").custom(helpersFincas.validarExistaIdFinca),
    check("ubicacion", "El Campo ubicacion no debe estar vacio").notEmpty(),
    check("numero", "El Campo ubicacion no debe estar vacio").notEmpty(),
    check("cultivoAnterior", "El Campo cultivoAnterior no debe estar vacio").notEmpty(),
    check("cultivoActual", "El Campo cultivoActual no debe estar vacio").notEmpty(),
    check("descripcion", "El Campo descripcion no debe estar vacio").notEmpty(),
    check("area", "El Campo area no debe estar vacio").notEmpty(),
    check("asistenteTecnico", "El Campo asistenteTecnico no debe estar vacio").notEmpty(),
    validarCampos,
], httpsParcelas.postParcela);


router.put("/actualizar/:id",[
    check("idfincas", "El ID de la finca es requerido").notEmpty(),
    check("idfincas").custom(helpersFincas.validarExistaIdFinca),
    check("ubicacion", "El Campo ubicacion no debe estar vacio").notEmpty(),
    check("numero", "El Campo ubicacion no debe estar vacio").notEmpty(),
    check("cultivoAnterior", "El Campo cultivoAnterior no debe estar vacio").notEmpty(),
    check("cultivoActual", "El Campo cultivoActual no debe estar vacio").notEmpty(),
    check("descripcion", "El Campo descripcion no debe estar vacio").notEmpty(),
    check("area", "El Campo area no debe estar vacio").notEmpty(),
    check("asistenteTecnico", "El Campo asistenteTecnico no debe estar vacio").notEmpty(),
    validarCampos,
],httpsParcelas.putParcela);

router.put("/activar/:id", httpsParcelas.putActivarParcela);

router.put("/desactivar/:id", httpsParcelas.putDesactivarParcela);




router.get("/fechas", httpsParcelas.getParcelas);
router.get("/asistente", httpsParcelas.getParcelas);
export default router;