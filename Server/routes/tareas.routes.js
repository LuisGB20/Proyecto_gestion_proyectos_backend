<<<<<<< HEAD
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
=======
import {Router} from 'express';
import {
    agregarTarea,
    obtenerTareas,
    obtenerTarea,
    editarTarea,
    eliminarTarea
} from '../controllers/tareas.controller.js';

const router = Router();

router.get('/tareas', obtenerTareas);
router.post('/tareas', agregarTarea);
router.get('/tareas/:id', obtenerTarea);
router.put('/tareas/:id', editarTarea);
router.delete('/tareas/:id', eliminarTarea);

export default router;
>>>>>>> 0ea49ace5ddf1fbf95f4ffad26f613d58aef7856
