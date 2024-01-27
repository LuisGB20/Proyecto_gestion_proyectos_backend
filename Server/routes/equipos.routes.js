import { Router } from "express";
import {
    agregarEquipo,
    obtenerEquipos,
    obtenerEquipo,
    actualizarEquipo,
    eliminarEquipo
} from '../controllers/equipos.controllers.js'

const router = Router();

router.post('/equipos', agregarEquipo);

router.get('/equipos', obtenerEquipos);

router.get('/equipos/:id', obtenerEquipo);

router.put('/equipos/:id', actualizarEquipo);

router.delete('/equipos/:id', eliminarEquipo);

export default router