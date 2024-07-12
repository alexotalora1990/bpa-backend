import { Router } from "express";


const router = Router();

router.get("/", httpMantenimientos.getMantenimientos);
router.get("/mantenimientos/:id",httpMantenimientos.getMantenimientos);
router.get("/activos", httpMantenimientos.getMantenimientos);
router.get("/desactivados", httpMantenimientos.getMantenimientos);
router.get("/fechas", httpMantenimientos.getMantenimientos);
router.get("/responsable", httpMantenimientos.getMantenimientos);


router.post("/agregar",[], httpMantenimientos.postMantenimientos);

router.put("/actualizar",[],httpMantenimientos.putMantenimientos);
router.put("activar/:id", httpMantenimientos.putMantenimientos);
router.put("desactivar/:id", httpMantenimientos.putMantenimientos);

export default router;