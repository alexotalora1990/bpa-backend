import { Router } from "express";
import { check } from 'express-validator';
import  {validarCampos } from '../middleware/validar-campos.js';
import httpsPreparacionSuelos from '../controllers/PreparacionSuelo.js';
import helpersPreparacionSuelo from '../helpers/PreparacionSuelo.js';
import helpersParcelas from "../helpers/parcelas.js";
import helpersEmpleado from "../helpers/Empleados.js";

const router = Router();

router.get("/", httpsPreparacionSuelos.getPreparacion);

router.get("/preparacion/:id",[
    check("id","ID de finca invalido").isMongoId(),
    check("id").custom(helpersPreparacionSuelo.validarExistaIdPreparacion),
    validarCampos
], httpsPreparacionSuelos.getPreparacionID);

router.get("/obt/activos", httpsPreparacionSuelos.getPreparacionActivas); 

router.get("/obt/desactivados", httpsPreparacionSuelos.getPreparacionDesactivadas);


router.post("/agregar",[
    check("fecha", "La fecha no puede estar vacia").notEmpty(),
    check("idparcela", "ID de paracela es requerido").notEmpty(),
    check("idempleado", "ID de empleado es requerido").notEmpty(),
    check("idempleado").custom(helpersEmpleado.validarExistaIdEmpleados),
    check("idparcela").custom(helpersParcelas.validarExistaIdParcela),
    check("productos", "Productos es requerido").notEmpty(),
    check("operario", "operario es requerido").notEmpty(),
    check("operario", "operario debe tener al menos 3 caracteres").isLength({min:3}),
    check("responsable", "responsable es requerido").notEmpty(),
    check("responsable", "responsable debe tener al menos 3 caracteres").isLength({min:3}),
    check("observaciones", "observaciones es requerido").notEmpty(),
    validarCampos,
], httpsPreparacionSuelos.postPreparacionSuelo);

router.put("/actualizar",[
    check("idparcela", "ID de paracela es requerido").notEmpty(),
    check("idempleado", "ID de empleado es requerido").notEmpty(),
    check("idempleado").custom(helpersEmpleado.validarExistaIdEmpleados),
   check("idparcela").custom(helpersParcelas.validarExistaIdParcela),
    check("productos", "Productos es requerido").notEmpty(),
    check("operario", "operario es requerido").notEmpty(),
    check("operario", "operario debe tener al menos 3 caracteres").isLength({min:3}),
    check("responsable", "responsable es requerido").notEmpty(),
    check("responsable", "responsable debe tener al menos 3 caracteres").isLength({min:3}),
    check("observaciones", "observaciones es requerido").notEmpty(),
    validarCampos,
], httpsPreparacionSuelos.putPreparacion);

router.put("activar/:id",[
    validarCampos
], httpsPreparacionSuelos.putActivarPreparacion);
router.put("desactivar/:id", [
    
    validarCampos
], httpsPreparacionSuelos.putDesactivarPreparacion);

export default router;