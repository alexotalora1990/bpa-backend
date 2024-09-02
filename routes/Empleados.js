import { Router } from "express";
import { check } from 'express-validator';
import httpsEmpleados from "../controllers/Empleados.js";
import helpersEmpleado from "../helpers/Empleados.js";
import  {validarCampos } from '../middleware/validar-campos.js';
// import { validarJWT } from "../middleware/validar-jwts.js";


const router = Router();

router.get("/",[], httpsEmpleados.getEmpleados);

router.get("/empleados/:id",[
    check("id","ID de empleado invalido").isMongoId(),
    check("id").custom(helpersEmpleado.validarExistaIdEmpleados),
    validarCampos
], httpsEmpleados.getEmpleadoID);

router.get("/obtener/activos", httpsEmpleados.getEmpleadosActivos);

router.get("/obtener/desactivados", httpsEmpleados.getEmpleadosInactivos);

// router.get("/fechas/", httpsEmpleados.getEmpleadosFechas);

// router.get("/comprasX", httpsEmpleados.getEmpleadosXcompras);

router.post("/agregar",[
    check("nombre", "El nombre es requerido").notEmpty(),
    check("nombre", "El nombre debe tener al menos 3 caracteres").isLength({ min: 3 }),
    check("numdocumento", "El Numero de Documento es requerido").notEmpty(),
    check("numdocumento", "El Numero de Documento debe ser unico").custom(helpersEmpleado.validarDocumentoUnico),
    check("correo", "El correo es requerido").notEmpty(),
    check("correo", "El correo debe ser unico").custom(helpersEmpleado.validarCorreoUnico),
    check("contrasena", "La contraseña es requerida").notEmpty(),
    check("direccion", "La direccion es requerida").notEmpty(),
    check("telefono", "el telefono es requerido").notEmpty(),
    check("telefono", "El Numero de Documento debe ser unico").custom(helpersEmpleado.validarTelefonoUnico),
    check("estudios", "Los estudios son requeridos").notEmpty(),
    validarCampos,
], httpsEmpleados.postEmpleados);

router.put("/actualizar/:id",[
    check("nombre", "El nombre es requerido").notEmpty(),
    check("nombre", "El nombre debe tener al menos 3 caracteres").isLength({ min: 3 }),
    check("numdocumento", "El Numero de Documento es requerido").notEmpty(),
    check("numdocumento", "El Numero de Documento debe ser unico").custom(helpersEmpleado.validarDocumentoUnico),
    check("correo", "El correo es requerido").notEmpty(),
    check("correo", "El correo debe ser unico").custom(helpersEmpleado.validarCorreoUnico),
    check("contrasena", "La contraseña es requerida").notEmpty(),
    check("direccion", "La direccion es requerida").notEmpty(),
    check("telefono", "el telefono es requerido").notEmpty(),
    check("telefono", "El Numero de Documento debe ser unico").custom(helpersEmpleado.validarTelefonoUnico),
    check("estudios", "Los estudios son requeridos").notEmpty(),
    validarCampos,
], httpsEmpleados.putEmpleados);

router.put("/activar/:id", httpsEmpleados.putEmpleadosActivar);
router.put("/desactivar/:id", httpsEmpleados.putEmpleadosDesactivar);

export default router;