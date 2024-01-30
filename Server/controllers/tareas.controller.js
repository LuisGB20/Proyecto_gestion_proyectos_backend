import { pool } from '../db.js'

export const agregarTarea = async (req, res) => {
    const { nombre, descripcion, estado, usuario, proyecto } = req.body;
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const fechaActual = `${año}-${mes}-${dia}`;
    try {
        const [rows] = await pool.query('INSERT INTO tareas (nombre, descripcion, fecha_inicio, estado, usuario_id, proyecto_id) VALUES (?, ?, ?, ?, ?, ?)', [nombre, descripcion, fechaActual, estado, usuario, proyecto]);
        res.json({
            id: rows.insertId,
            nombre,
            descripcion,
            fecha_creacion: fechaActual,
            estado,
            usuario,
            proyecto
        });
    } catch (error) {
        console.log(error);
    }
}

export const obtenerTareas = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tareas');
        res.json(rows);
    } catch (error) {
        console.log(error);
    }
}

export const obtenerTarea = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(rows[0]);
    } catch (error) {
        console.log(error);
    }
}

export const editarTarea = async (req, res) => {
    const { nombre, descripcion, fechaInicio, estado, usuario, proyecto } = req.body;
    try {
        if(estado === 2){
            const fecha = new Date();
            const año = fecha.getFullYear();
            const mes = fecha.getMonth() + 1;
            const dia = fecha.getDate();
            const fechaFinalizacion = `${año}-${mes}-${dia}`;
            const [result] = await pool.query('UPDATE tareas SET nombre = ?, descripcion = ?, fecha_fin = ?, estado = ?, usuario_id = ?, proyecto_id = ? WHERE id = ?', [nombre, descripcion, fechaFinalizacion, estado, usuario, proyecto, req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada' });
            const [rows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [req.params.id]);
            res.json(rows[0]);
        } else {
            const [result] = await pool.query('UPDATE tareas SET nombre = ?, descripcion = ?, estado = ?, usuario_id = ?, proyecto_id = ? WHERE id = ?', [nombre, descripcion, estado, usuario, proyecto, req.params.id]);
            if (result.affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada' });
            const [rows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [req.params.id]);
            res.json(rows[0]);
        }
    } catch (error) {
        console.log(error);
    }
}

export const eliminarTarea = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM tareas WHERE id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
    }
}