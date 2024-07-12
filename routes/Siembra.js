import { Router } from "express";
import { check } from 'express-validator';

import httpSiembras from "../controllers/Siembra.js";
import helpersSiembra from '../helpers/Siembra.js';
import { validarCampos } from '../middleware/validar-campos.js';


const router = Router();

router.get("/", httpSiembras.getSiembras); //ya

router.get("/:id", [
    check("id", "ID de siembra invalido").isMongoId(),
    validarCampos,
    async (req, res, next) => {
      try {
        const { id } = req.params;
        await helpersSiembra.validarExistaIdSiembra(id); 
        next();
      } catch (error) {
        res.status(404).json({ error: error.message });
      }
    },
], httpSiembras.getSiembrasID); // ya

router.get("/activos", httpSiembras.getSiembrasActivo); //ya

router.get("/inactivos", httpSiembras.getSiembrasInactivo); //ya

router.get("/listarXFechas", httpSiembras.getSiembrasByFechas); //ya

router.get("/listarXEmpleados/:id", httpSiembras.getSiembrasByEmpleado); //ya

router.get("listarXcultivoPrevio",httpSiembras.getSiembrasByCultivoPrevio)

router.get("/estado/:estado", [
    check("estado", "El estado debe ser un numero valido").isNumeric(),
    validarCampos,
], httpSiembras.getSiembrasByEstado); //ya

router.post("/agregar", [
    check("nombre", "El nombre es requerido").notEmpty(),
    check("tipo", "El tipo es requerido").notEmpty(),
    check("fechaSiembra", "La fecha de siembra es requerida").notEmpty().isDate(),
    check("cantidad", "La cantidad es requerida").notEmpty(),
    check("cantidad", "La cantidad debe ser un numero valido").isNumeric(),
    validarCampos,
], httpSiembras.postSiembras); //ya

router.put("/actualizar/:id", [
    check("id", "ID de siembra invalido").isMongoId(),
    validarCampos,
], httpSiembras.putSiembras); //ya

router.put("/activar/:id", [
    check("id", "ID de siembra invalido").isMongoId(),
    validarCampos,
], httpSiembras.putSiembrasActivar); //ya

router.put("/desactivar/:id", [
    check("id", "ID de siembra invalido").isMongoId(),
    validarCampos,
], httpSiembras.putSiembrasDesactivar); //ya




export default router;



