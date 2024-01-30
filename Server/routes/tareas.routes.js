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