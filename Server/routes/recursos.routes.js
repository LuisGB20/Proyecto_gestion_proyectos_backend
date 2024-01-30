import {Router} from 'express';
import {
    agregarRecurso,
    obtenerRecursos,
    obtenerRecurso,
    editarRecurso,
    eliminarRecurso
} from '../controllers/recursos.controller.js'

const router = Router();


router.post('/recursos', agregarRecurso);
router.get('/recursos', obtenerRecursos);
router.get('/recursos/:id', obtenerRecurso);
router.put('/recursos/:id', editarRecurso);
router.delete('/recursos/:id', eliminarRecurso);

export default router;