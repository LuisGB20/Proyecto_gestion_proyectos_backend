import { Router } from "express";
import {
    obtenerComentarios,
    agregarComentario,
    editarComentario,
    eliminarComentario,
    obtenerComentario
} from '../controllers/comentarios.controller.js'

const router = Router();

router.post('/comentarios', agregarComentario)
router.get('/comentarios/:equipo_id', obtenerComentarios)
router.get('/comentarios/:id', obtenerComentario)
router.put('/comentarios/:id', editarComentario)
router.delete('/comentarios/:id', eliminarComentario)

export default router;