import { Router } from 'express';
const router = Router();
import {register, login, verificarCorreo, verificarPregunta, vericarCodigo} from '../controllers/auth.controller.js';

router.post('/registro', register);
router.post('/login', login);
router.post('/verificacion-correo', verificarCorreo);
router.post('/verificacion-codigo', vericarCodigo);
router.post('/verificacion-pregunta', verificarPregunta);

export default router;