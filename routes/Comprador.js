import { Router } from "express";

const router = Router();

router.get("/", httpComprador.getComprador);

router.get("/comprador/:id", httpComprador.getCompradorID);

router.get("/activos", httpComprador.getCompradorActivos);

router.get("/desactivados", httpComprador.getCompradorInactivos);

router.get("/fechas/", httpComprador.getComprador);

router.get("/comprasXcomprador", httpComprador.getComprador);

router.post("/agregar",[], httpComprador.postComprador);

router.put("/actualizar",[], httpComprador.putComprador);
router.put("/activar/:id", httpComprador.putCompradorActivar);
router.put("/desactivar/:id", httpComprador.putCompradorDesactivar);

export default router;