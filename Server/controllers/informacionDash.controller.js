import {pool} from '../db.js'


export const obtenerInformacionDash = async (req, res) => {
    try {
        // Peticion a usuario
        const [usuario] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id]);
        const equipo_id = usuario[0]?.equipo_id;

        if (!equipo_id) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Peticion a equipos
        const [equipo] = await pool.query('SELECT * FROM equipos WHERE id = ?', [equipo_id]);
        const proyecto_id = equipo[0]?.proyecto_id;

        if (!proyecto_id) {
            return res.status(404).json({ error: 'Equipo no encontrado' });
        }

        //Contar cantidad de personas, de programadores, de diseñadores y analistas
        const [cantidadMiembros] = await pool.query('SELECT COUNT(*) AS cantidad FROM usuarios WHERE equipo_id = ?', [equipo_id]);
        const [cantidadDiseñadores] = await pool.query('SELECT COUNT(*) AS cantidad FROM usuarios WHERE equipo_id = ? AND rol_id = 2', [equipo_id]);
        const [cantidadProgramadores] = await pool.query('SELECT COUNT(*) AS cantidad FROM usuarios WHERE equipo_id = ? AND rol_id = 3', [equipo_id]);
        const [cantidadAnalistas] = await pool.query('SELECT COUNT(*) AS cantidad FROM usuarios WHERE equipo_id = ? AND rol_id = 4', [equipo_id]);
        const cantidades = {
            cantidadMiembros: cantidadMiembros[0].cantidad,
            cantidadDiseñadores: cantidadDiseñadores[0].cantidad,
            cantidadProgramadores: cantidadProgramadores[0].cantidad,
            cantidadAnalistas: cantidadAnalistas[0].cantidad,
        }


        // Peticion a proyectos
        const [proyecto] = await pool.query('SELECT * FROM proyectos WHERE id = ?', [proyecto_id]);
        const idProyecto = proyecto[0]?.id;

        if (!idProyecto) {
            return res.status(404).json({ error: 'Proyecto no encontrado' });
        }

        // Devolver todo
        res.json({
            usuario: usuario[0],
            equipo: equipo[0],
            proyecto: proyecto[0],
            cantidades
        });
    } catch (error) {
        console.error('Error en obtenerInformacionDash:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
