import { Router } from "express";
import { check } from 'express-validator';
import httpsSiembra from "../controllers/Siembra.js"
import helpersSiembra from '../helpers/Siembra.js';
import helpersCultivo from "../helpers/Cultivos.js";
import helpersEmpleado from "../helpers/Empleados.js";
import helpersInventario from "../helpers/Inventarios.js";
import { validarCampos } from '../middleware/validar-campos.js';


const router = Router();

router.get("/", httpsSiembra.getSiembras);


router.get("/siembra/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersSiembra.validarExistaIdSiembra),
    validarCampos
], httpsSiembra.getSiembraID);

router.get("/activas", httpsSiembra.getSiembrasActivas);


router.get("/inactivas", httpsSiembra.getSiembrasInactivas);

router.get("/listarXEmpleados/:id", httpSiembras.getSiembrasByEmpleado); //ya

// router.get("listarXcultivoPrevio",httpSiembras.getSiembrasByCultivoPrevio)

router.get("/estado/:estado", [
    check("estado", "El estado debe ser un numero valido").isNumeric(),
    validarCampos,
], httpSiembras.getSiembrasByEstado); //ya


router.get("/siembra/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersSiembra.validarExistaIdSiembra),
    validarCampos
], httpsSiembra.getSiembraID);

router.get("/activas", httpsSiembra.getSiembrasActivas);

router.get("/inactivas", httpsSiembra.getSiembrasInactivas);



router.post("/agregar", [
    check('idcultivos', 'El id de cultivos es obligatorio').isMongoId(),
    check('idcultivos').custom(helpersCultivo.validarExistaIdcultivo),
    check('idempleados', 'El id de empleados es obligatorio').isMongoId(),
    check('idempleados').custom(helpersEmpleado.validarExistaIdEmpleados),
    check('idinventario', 'El id de inventario es obligatorio').isMongoId(),
    check('idinventario').custom(helpersInventario.validarExistaIdInventario),
    check('fechasiembra', 'La fecha de siembra es obligatoria').isDate(),
    check('fechacosecha', 'La fecha de cosecha es obligatoria').isDate(),
    check('transplante', 'El transplante es obligatorio').not().isEmpty(),
    check('cultivoanterior', 'El cultivo anterior es obligatorio').not().isEmpty(),
    validarCampos
], httpsSiembra.postSiembra);

router.put("/actualizar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(helpersSiembra.validarExistaIdSiembra),
    check('idcultivos', 'El id de cultivos es obligatorio').isMongoId(),
    check('idcultivos').custom(helpersCultivo.validarExistaIdcultivo),
    check('idempleados', 'El id de empleados es obligatorio').isMongoId(),
    check('idempleados').custom(helpersEmpleado.validarExistaIdEmpleados),
    check('idinventario', 'El id de inventario es obligatorio').isMongoId(),
    check('idinventario').custom(helpersInventario.validarExistaIdInventario),
    check('fechasiembra', 'La fecha de siembra debe ser una fecha válida').optional().isDate(),
    check('fechacosecha', 'La fecha de cosecha debe ser una fecha válida').optional().isDate(),
    check('transplante', 'El transplante debe ser un string').optional().isString(),
    check('cultivoanterior', 'El cultivo anterior debe ser un string').optional().isString(),
    validarCampos
], httpsSiembra.putSiembra);

router.put("/activar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsSiembra.putSiembraActivar);

router.put("/desactivar/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    validarCampos
], httpsSiembra.putSiembraDesactivar);
