import { Router } from "express";
import {
    obtenerUsuarios,
    obtenerUsuario,
    agregarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    obtenerUsuariosNoJefes
} from '../controllers/usuarios.controller.js'

const router = Router();

router.get("/usuarios", obtenerUsuarios)
router.get("/usuarios/:id", obtenerUsuario)
router.get("/usuariosnojefes", obtenerUsuariosNoJefes)
router.post("/usuarios", agregarUsuario)
router.put("/usuarios/:id", actualizarUsuario)
router.delete("/usuarios/:id", eliminarUsuario)

export default router;