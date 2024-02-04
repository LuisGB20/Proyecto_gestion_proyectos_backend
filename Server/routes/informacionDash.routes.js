import { Router } from "express";
import {obtenerInformacionDash} from '../controllers/informacionDash.controller.js'



const router = Router();
router.get('/InformacionDash/:id', obtenerInformacionDash);


export default router;