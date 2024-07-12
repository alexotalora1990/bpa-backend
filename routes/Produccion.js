import { Router } from "express";


import { check } from 'express-validator';



import httpFertilizacion from "../controllers/Produccion.js"
import  {validarCampos } from '../middleware/validar-campos.js';


import helpersProduccion from "../helpers/Produccion.js"
import helpersCultivo from "../helpers/Cultivos.js"
import httpProduccion from "../controllers/Produccion.js";





const router = Router();

router.get("/", httpProduccion.getProduccion);


router.get("/produccion/:id",[
    check("id","ID de fertilizacion invalido").isMongoId(),
    check("id").custom(helpersProduccion.validarExistaIdProduccion),
    validarCampos
], httpProduccion.getProduccionID);


router.get("/obtener/activos", httpProduccion.getProduccionActivas);


router.get("/obtener/desactivados", httpProduccion.getProduccionInactivas);


router.post("/agregar",[
    check("idcultivo", "El id de cultivo es requerido").notEmpty(),
    check("idcultivo", "ID de cultivo inválido ").isMongoId(),
    check("Numlote", "Numero de lote es requerido").notEmpty(),
    check("especie", "La especie del cultivo es requerido").notEmpty(),
    check("cantidad", "La cantidad de produccion es requerido").notEmpty(),
    check("cantidadTrabajadores", "La cantidad de trabajadoes es requerida").notEmpty(),
    check("observaciones","Observaciones de produccion son requeridas").notEmpty(),
    check("idcultivo").custom(helpersCultivo.validarExistaIdcultivo),    

validarCampos,
], httpProduccion.postProduccion);

router.put("/actualizar/:id",[
    check("id", "El id de Produccion invalido").isMongoId(),
    check("id").custom(helpersProduccion.validarExistaIdProduccion),
    
validarCampos,
], httpProduccion.putProduccion);


router.put("/activar/:id",[
    check("id", "El id de Produccion invalido").isMongoId(),
    check("id").custom(helpersProduccion.validarExistaIdProduccion),
    validarCampos
], httpProduccion.putProduccionActivar);
router.put("/desactivar/:id",[
    check("id", "El id de Produccion invalido").isMongoId(),
    check("id").custom(helpersProduccion.validarExistaIdProduccion),
    validarCampos
], httpProduccion.putProduccionDesactivar);

export default router;