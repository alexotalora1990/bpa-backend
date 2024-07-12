import { Router } from "express";
import { check } from 'express-validator';
import  {validarCampos } from '../middleware/validar-campos.js';
import httpProcesos from "../controllers/Procesos.js"
import helpersProcesos from "../helpers/Procesos.js";
import helpersCultivo from "../helpers/Cultivos.js";
import helpersEmpleado from "../helpers/Empleado.js";



const router = Router();

router.get("/", httpProcesos.getProcesos);
router.get("/procesos/:id",[
    check("id","ID de Proceso invalido").isMongoId(),
    check("id").custom(helpersProcesos.validarExistaIdProceso),
    validarCampos
], httpProcesos.getProcesosID);


router.get("obtener/activos", httpProcesos.getProcesosActivos);
router.get("obtener/desactivados", httpProcesos.getProcesosInactivos);

router.get("/fechas/", http.get);
router.get("/comprasX", http.get);

router.post("/agregar",[
    check("idcultivo", "El id de Cultivo es requerido").notEmpty(),
    check("idempleado", "El id de Empleado es requerido").notEmpty(),
    check("idcultivo", "El id de Cultivo es invalido").isMongoId(),
    check("idempleado", "El id de Empleado es invalido").isMongoId(),
    check("tipo", "El tipo de proceso es requerido").notEmpty(),
    check("descripcion", "La descripcion de proceso es requerido").notEmpty(),
    check("descripcion", "La descripcion debe tener al menos 3 caracteres").isLength({ min: 3 }),
    check("fechaInicio", "La fecha de inicio  del proceso es requerido").notEmpty(),
    check("fechaFinal", "La fecha final  del proceso es requerido").notEmpty(),
    check("idcultivo").custom(helpersCultivo.validarExistaIdcultivo),
    check("idempleado").custom(helpersEmpleado.validarExistaIdEmpleados),
    validarCampos,
], httpProcesos.postProceso);

router.put("/actualizar/:id",[
    check("id", "El id es requerido").notEmpty(),
    check("id", "El id  es invalido").isMongoId(),
    check("id").custom(helpersProcesos.validarExistaIdProceso),
    check("idcultivo", "El id de Cultivo es requerido").notEmpty(),
    check("idempleado", "El id de Empleado es requerido").notEmpty(),
    check("idcultivo", "El id de Cultivo es invalido").isMongoId(),
    check("idempleado", "El id de Empleado es invalido").isMongoId(),
    check("tipo", "El tipo de proceso es requerido").notEmpty(),
    check("descripcion", "La descripcion de proceso es requerido").notEmpty(),
    check("descripcion", "La descripcion debe tener al menos 3 caracteres").isLength({ min: 3 }),
    check("fechaInicio", "La fecha de inicio  del proceso es requerido").notEmpty(),
    check("fechaFinal", "La fecha final  del proceso es requerido").notEmpty(),
    check("idcultivo").custom(helpersCultivo.validarExistaIdcultivo),
    check("idempleado").custom(helpersEmpleado.validarExistaIdEmpleados),
    validarCampos,

], httpProcesos.put);
router.put("activar/:id",[
    check("id", "El id  es invalido").isMongoId(),
    check("id").custom(helpersProcesos.validarExistaIdProceso),
    validarCampos,
], httpProcesos.putProcesoActivar);
router.put("desactivar/:id",[
    check("id", "El id  es invalido").isMongoId(),
    check("id").custom(helpersProcesos.validarExistaIdProceso),
    validarCampos,
], httpProcesos.putProcesoDesactivar);

export default router;  
