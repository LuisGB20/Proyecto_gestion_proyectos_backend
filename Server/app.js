import express from 'express';
import cors from 'cors';
import { puerto } from './config.js';
import indexRoutes from './routes/index.routes.js';
import authRoutes from './routes/auth.routes.js';
import usuarioRoutes from './routes/usuarios.routes.js';
import equiposRoutes from './routes/equipos.routes.js'
import proyectosRoutes from './routes/proyectos.routes.js'
import comentariosRoutes from './routes/comentarios.routes.js'

const app = express();

app.use(cors());

app.use(express.json());

app.use(indexRoutes);
app.use(authRoutes);
app.use(usuarioRoutes);
app.use(equiposRoutes);
app.use(proyectosRoutes);
app.use(comentariosRoutes);

app.listen(puerto, () => {
    console.log(`Servidor escuchando en puerto ${puerto}`);
})
