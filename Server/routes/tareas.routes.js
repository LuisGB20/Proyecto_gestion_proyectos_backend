import { Router } from "express";
import {
    agregarTarea,
    obtenerTarea,
    obtenerTareas,
    editarTarea,
    eliminarTarea
    
} from '../controllers/tareas.controller.js'

const router =  Router();
router.post('/tareas', agregarTarea);
router.get('/tareas/:id', obtenerTarea);
router.get('/tareas', obtenerTareas);
router.get('/tareas/:id', editarTarea);
router.get('/tareas/:id', eliminarTarea);

export default router