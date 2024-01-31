import { Router } from 'express';
const router = Router();
import {register, login, verificarCorreo, verificarPregunta, vericarCodigo, agregarPreguntaYRespuesta} from '../controllers/auth.controller.js';

router.post('/registro', register);
router.post('/login', login);
router.post('/verificacion-correo', verificarCorreo);
router.post('/verificacion-codigo', vericarCodigo);
router.post('/verificacion-pregunta', verificarPregunta);
router.post('/crearRespuestaPregunta', agregarPreguntaYRespuesta);

export default router;