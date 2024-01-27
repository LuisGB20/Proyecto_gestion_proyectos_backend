import { Router } from "express";
import {
    obtenerUsuarios,
    obtenerUsuario,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario
} from '../controllers/usuarios.controller.js'

const router = Router();

router.get("/usuarios", obtenerUsuarios)
router.get("/usuarios/:id", obtenerUsuario)
router.post("/usuarios", agregarUsuario)
router.put("/usuarios/:id", actualizarUsuario)
router.delete("/usuarios/:id", eliminarUsuario)

export default router;