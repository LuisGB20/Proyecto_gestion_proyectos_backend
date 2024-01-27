import { Router } from "express";
import {
    agregarProyecto,
    obtenerProyectos,
    obtenerProyecto,
    actualizarProyecto,
    eliminarProyecto
} from "../controllers/proyectos.controller.js"

const router = Router();

router.get('/proyectos', obtenerProyectos)
router.post('/proyectos', agregarProyecto)
router.get('/proyectos/:id', obtenerProyecto)
router.put('/proyectos/:id', actualizarProyecto)
router.delete('/proyectos/:id', eliminarProyecto)

export default router