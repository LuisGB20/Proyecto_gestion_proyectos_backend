import {Router} from 'express';
import {
    agregarTarea,
    obtenerTareas,
    obtenerTareasUsuario,
    obtenerTarea,
    editarTarea,
    eliminarTarea,
    obtenerTareasEquipoProyecto,
    editarEstadoTarea,
    obtenerTareasEquipo,
    obtenerTareaProyecto
} from '../controllers/tareas.controller.js';

const router = Router();

router.get('/tareas', obtenerTareas);
router.post('/tareas', agregarTarea);
router.get('/tareas/:id', obtenerTarea);
router.get('/tareas/usuario/:id', obtenerTareasUsuario);
router.get('/tareas/equipo/:equipo_id', obtenerTareasEquipo);
router.get('/tareas/:equipo/:proyecto', obtenerTareasEquipoProyecto);
router.get('/tareas/asignaciones/proyecto/:proyecto', obtenerTareaProyecto);
router.put('/tareas/:id', editarTarea);
router.put('/tareas/estado/:id', editarEstadoTarea)
router.delete('/tareas/:id', eliminarTarea);

export default router;
