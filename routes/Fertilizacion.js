import { Router } from "express";
import { check } from 'express-validator';

import httpFertilizacion from "../controllers/Fertilizacion.js";
import  {validarCampos } from '../middleware/validar-campos.js';
import helpersCultivo from "../helpers/Cultivos.js"
import helpersEmpleado from "../helpers/Empleados.js"
import helpersFertilizacion from "../helpers/Fertilizacion.js"

// pendiente inventario



const router = Router();

router.get("/", httpFertilizacion.getFertilizacion);


router.get("/fertilizacion/:id",[
    check("id","ID de fertilizacion invalido").isMongoId(),
    check("id").custom(helpersFertilizacion.validarExistaIdFertlizacion),
    validarCampos
], httpFertilizacion.getFertilizacionID);


router.get("/obtener/activos", httpFertilizacion.getFertilizacionActivas);


router.get("/obtener/desactivados", httpFertilizacion.getFertilzacionInactivas);


router.post("/agregar",[
    check("idcultivo", "El id de cultivo es requerido").notEmpty(),
    check("idcultivo", "ID de cultivo inválido ").isMongoId(),
    check("idempleado", "El id de empleado es requerido").notEmpty(),
    check("idempleado", "ID de Empleado inválido ").isMongoId(),
    check("idinventario", "El id de inventario es requerido").notEmpty(),
    check("idinventario", "ID de Empleado inválido ").isMongoId(),
    check("estadoFenologico", "El estado fenologico es requerido").notEmpty(),
    check("tipo", "el tipo es requerido").notEmpty(),
    check("nombreFertilizante", "El nombre de fertilizante es requerido").notEmpty(),
    check("cantidad", "La cantidad es requerida").notEmpty(),
    check("idempleado").custom(helpersEmpleado.validarExistaIdEmpleados),
    check("idcultivo").custom(helpersCultivo.validarExistaIdcultivo),    

validarCampos,
], httpFertilizacion.postFertilizacion);

router.put("/actualizar/:id",[
    check("id", "El id de Fertilizacion invalido").isMongoId(),
    check("id").custom(helpersFertilizacion.validarExistaIdFertlizacion),
    
validarCampos,
], httpFertilizacion.putFertilizacion);


router.put("/activar/:id",[
    check("id", "El id de Fertilizacion invalido").isMongoId(),
    check("id").custom(helpersFertilizacion.validarExistaIdFertlizacion),
    validarCampos
], httpFertilizacion.putFertilizarActivar);
router.put("/desactivar/:id",[
    check("id", "El id de Fertilizacion invalido").isMongoId(),
    check("id").custom(helpersFertilizacion.validarExistaIdFertlizacion),
    validarCampos
], httpFertilizacion.putFertilizacionDesactivar);

export default router;