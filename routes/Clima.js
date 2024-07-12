import { Router } from "express";
  
const router = Router();

router.get("/", httpClimas.getClimas);

router.get("/climas/:id", httpClimas.getClimasID);

router.get("/activos", httpClimas.getClimasActivos);

router.get("/desactivados", httpClimas.getClimasInactivos);

router.get("/fechas/", httpClimas.getClimas);

router.get("/temperatura/", httpClimas.getClimas);

router.get("/duracion/", httpClimas.getClimas);

router.get("/tipoclima/", httpClimas.getClimas);

router.post("/agregar",[], httpClimas.postClimas);

router.put("/actualizar",[], httpClimas.putClimas);

router.put("activar/:id", httpClimas.putClimasActivar);
router.put("desactivar/:id", httpClimas.putClimasDesactivar);

export default router;