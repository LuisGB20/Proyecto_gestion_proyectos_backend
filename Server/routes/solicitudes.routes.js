import { Router } from "express";
import {
    agregarSolicitud,
    obtenerSolicitudes,
    obtenerSolicitud,
    editarSolicitud,
    eliminarSolicitud
} from '../controllers/solicitudes.controller.js'

const router = Router();


router.post('/solicitudes', agregarSolicitud);
router.get('/solicitudes', obtenerSolicitudes);
router.get('/solicitudes/:id', obtenerSolicitud);
router.put('/solicitudes/:id', editarSolicitud);
router.delete('/solicitudes/:id', eliminarSolicitud);

export default router;
