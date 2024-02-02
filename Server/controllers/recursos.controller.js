import { pool } from '../db.js'

export const agregarRecurso = async (req, res) => {
    const { nombre, descripcion, disponibilidad, tipo, categoria } = req.body;
    console.log(req.body);
    try {
        const [results] = await pool.query('INSERT INTO recursos (nombre, descripcion, disponibilidad, tipo, categoria_id) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, disponibilidad, tipo, categoria]);
        if (results.affectedRows <= 0) {
            res.status(500).json({ message: 'Error al agregar el recurso' });
        }
        res.json({
            id: results.insertId,
            nombre,
            descripcion,
            disponibilidad,
            tipo,
            categoria_id: categoria,
        });
    } catch (error) {
        console.log(error);
    }
}

export const obtenerRecursos = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM recursos');
        if (results.length > 0) {
            res.json(results);
        } else {
            res.status(404).json({ message: 'recurso no encontrado' });
        }
    } catch (error) {
        console.log(error);
    }
}

export const obtenerRecurso = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM recursos WHERE id = ?', [req.params.id]);
        if (results.length <= 0) {
            res.status(500).json({ message: 'No hay recursos disponibles' });
        }
        res.json(results);
    } catch (error) {
        console.log(error);
    }
}

export const editarRecurso = async (req, res) => {
    const { nombre, descripcion, disponibilidad, tipo, categoria } = req.body
    try {
        const [results] = await pool.query('UPDATE recursos SET nombre = ?, descripcion = ?, disponibilidad = ?, tipo = ?, categoria_id = ? WHERE id = ?', [nombre, descripcion, disponibilidad, tipo, categoria, req.params.id]);
        if (results.affectedRows <= 0) {
            res.status(500).json({ message: 'Error al editar el recurso' });
        }
        res.json({
            id: results.insertId,
            nombre,
            descripcion,
            disponibilidad,
            tipo,
            categoria_id: categoria,
        });
    } catch (error) {
        console.log(error);
    }
}

export const eliminarRecurso = async (req, res) => {
    try {
        const [results] = await pool.query('DELETE FROM recursos WHERE id = ?', [req.params.id]);
        if (results.affectedRows <= 0) {
            res.status(500).json({ message: 'Error al eliminar el recurso' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error);
    }
}