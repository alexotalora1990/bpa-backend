import { Router } from "express";


const router = Router();

router.get("/", httpGastos.getGastos);
router.get("/gastos/:id", httpGastos.getGastos);
router.get("/activos", httpGastos.getGastos);
router.get("/desactivados", httpGastos.getGastos);
router.get("/fechas", httpGastos.getGastos);
router.get("/porcentaje", httpGastos.getGastos);
router.get("/responsable", httpGastos.getGastos);

router.post("/",[], httpGastos.postGastos);

router.put("/",[], httpGastos.putGastos);
router.put("activar/:id", httpGastos.putGastos);
router.put("desactivar/:id", httpGastos.putGastos);

export default router;
