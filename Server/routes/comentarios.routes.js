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
router.get('/comentarios', obtenerComentarios)
router.get('/comentarios/:id', obtenerComentario)
router.put('/comentarios/:id', editarComentario)
router.delete('/comentarios/:id', eliminarComentario)

export default router;