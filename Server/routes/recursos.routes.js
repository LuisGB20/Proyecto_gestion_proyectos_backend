import {Router} from 'express';
import {
    agregarRecurso,
    obtenerRecursos,
    obtenerRecurso,
    editarRecurso,
    eliminarRecurso,
    obtenerRecursoActivo,
    obtenerRecursosProyecto
} from '../controllers/recursos.controller.js'

const router = Router();


router.post('/recursos', agregarRecurso);
router.get('/recursos', obtenerRecursos);
router.get('/recursosActivo', obtenerRecursoActivo);
router.get('/recursos/:id', obtenerRecurso);
router.get('/recursos/proyecto/:proyecto', obtenerRecursosProyecto);
router.put('/recursos/:id', editarRecurso);
router.delete('/recursos/:id', eliminarRecurso);

export default router;