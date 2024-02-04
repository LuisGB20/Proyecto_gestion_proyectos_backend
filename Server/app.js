import express from 'express';
import fs from 'fs';
import https from 'https';
import cors from 'cors';
import { puerto } from './config.js';
import indexRoutes from './routes/index.routes.js';
import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import equiposRoutes from './routes/equipos.routes.js';
import proyectosRoutes from './routes/proyectos.routes.js';
import comentariosRoutes from './routes/comentarios.routes.js';
import recursosRoutes from './routes/recursos.routes.js';
import solicitudesRoutes from './routes/solicitudes.routes.js';
import tareasRoutes from './routes/tareas.routes.js';
import informacionDashRoutes from './routes/informacionDash.routes.js';
import categoriasRecursosRoutes from './routes/categoriasRecursos.routes.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(indexRoutes);
app.use(authRoutes);
app.use(usuarioRoutes);
app.use(equiposRoutes);
app.use(proyectosRoutes);
app.use(comentariosRoutes);
app.use(recursosRoutes);
app.use(solicitudesRoutes);
app.use(tareasRoutes);
app.use(informacionDashRoutes);
app.use(categoriasRecursosRoutes);

const opcionesHTTPS = {
    key: fs.readFileSync('C:/Windows/System32/cert.key'),
    cert: fs.readFileSync('C:/Windows/System32/cert.crt'),
};

const servidorHTTPS = https.createServer(opcionesHTTPS, app);


servidorHTTPS.listen(puerto, () => {
    console.log(`Servidor escuchando en puerto ${puerto}`);
})
