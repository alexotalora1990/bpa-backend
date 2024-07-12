import { Router } from "express";


const router = Router();

router.get("/", httpInventarios.getInventarios);
router.get("/inventarios/id", httpInventarios.getInventarios);
router.get("/activos", httpInventarios.getInventarios);
router.get("/desactivos", httpInventarios.getInventarios);
router.get("/fechas", httpInventarios.getInventarios);
router.get("/cantidad", httpInventarios.getInventarios);
router.get("/total", httpInventarios.getInventarios);
 
router.post("/agregar",[], httpInventarios.postInventarios);

router.put("/actualizar",[],httpInventarios.putInventarios);
router.put("activar/:id", httpInventarios.putInventarios);
router.put("desactivar/:id", httpInventarios.putInventarios);

export default router;