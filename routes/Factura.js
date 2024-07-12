import { Router } from "express";

const router = Router();

router.get("/", httpFacturas.getFacturas);

router.get("/facturas/:id", httpFacturas.getFacturas);

router.get("/activos", httpFacturas.getFacturasActivos);

router.get("/desactivados", httpFacturas.getFacturasInactivos);

router.get("/fechas/", httpFacturas.getFacturas);

router.get("/comprasX", httpFacturas.getFacturas);

router.post("/agregar",[], http.postFacturas);

router.put("/actualizar",[], httpFacturas.putFacturas);

router.put("/activar/:id", httpFacturas.putFacturasActivar);
router.put("/desactivar/:id", httpFacturas.putFacturasDesactivar);

export default router;