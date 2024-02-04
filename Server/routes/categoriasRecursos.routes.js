import { Router } from "express"
import { obtenerCategoriasRecursos } from "../controllers/categoriasRecursos.controller.js"

const router = Router()

router.get("/categoriasRecursos", obtenerCategoriasRecursos)

export default router;