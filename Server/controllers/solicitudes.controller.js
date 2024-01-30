import { pool } from '../db.js'

export const agregarSolicitud = async (req, res) => {
    const { miembro, proyecto, recurso } = req.body;
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const fechaFormateada = año + '-' + mes + '-' + dia;
    try {
        const [rows] = await pool.query('INSERT INTO solicitudes (fecha_solicitud, miembro_id, proyecto_id, recurso_id) VALUES (?, ?, ?, ?)', [fechaFormateada, miembro, proyecto, recurso]);
        res.json({
            id: rows.insertId,
            fecha,
            miembro,
            proyecto,
            recurso
        });
    } catch (error) {
        console.log(error);
    }
}

export const obtenerSolicitudes = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM solicitudes');
        res.json(results);
    } catch (error) {
        console.log(error);
    }
}

export const obtenerSolicitud = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM solicitudes WHERE id = ?', [req.params.id]);
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).json({ message: 'Solicitud no encontrada' });
        }
    } catch (error) {
        console.log(error);
    }
}

export const editarSolicitud = async (req, res) => {
    const { miembro, proyecto, recurso } = req.body

    try {
        const [results] = await pool.query('UPDATE solicitudes SET miembro_id = ?, proyecto_id = ?, recurso_id = ? WHERE id = ?', [miembro, proyecto, recurso, req.params.id]);
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Solicitud no encontrada' });
        } else {
            res.json({ id: req.params.id, miembro, proyecto, recurso });
        }
    } catch (error) {
        console.log(error);
    }
}

export const eliminarSolicitud = async (req, res) => {
    try {
        const [results] = await pool.query('DELETE FROM solicitudes WHERE id = ?', [req.params.id]);
        if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Solicitud no encontrada' });
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        console.log(error);
    }
}