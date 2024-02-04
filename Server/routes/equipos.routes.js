import { Router } from "express";
import {
    agregarEquipo,
    obtenerEquipos,
    obtenerEquipo,
    actualizarEquipo,
    eliminarEquipo,
    obtenerEquiposProyecto
} from '../controllers/equipos.controllers.js'

const router = Router();

router.post('/equipos', agregarEquipo);

router.get('/equipos', obtenerEquipos);

router.get('/equipos/:id', obtenerEquipo);

router.get('/equipos/proyecto/:proyecto', obtenerEquiposProyecto);

router.put('/equipos/:id', actualizarEquipo);

router.delete('/equipos/:id', eliminarEquipo);

export default router