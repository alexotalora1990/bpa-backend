import { Router } from "express";


import { check } from 'express-validator';



import httpSemillas from "../controllers/Semillas.js"
import  {validarCampos } from '../middleware/validar-campos.js';


import helpersProveedor from "../helpers/Proveedores.js"
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


router.post("/agregar",[
    check("idproveedores", "El id del proveedor es requerido").notEmpty(),
    check("idproveedores", "ID de proveedores es inválido ").isMongoId(),
    check("numFactura", "Numero de factura es requerido").notEmpty(),
    check("fechaCompra", "La fecha de compra es requerido").notEmpty(),
    check("fechaVencimiento", "La fecha de vencimiento es requerida").notEmpty(),
    check("espeie", "La especie de trabajadoes es requerida").notEmpty(),

    
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