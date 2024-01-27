import { pool } from '../db.js';

export const agregarEquipo = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const [rows] = await pool.query('INSERT INTO equipos (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion]);
        res.json({
            id: rows.insertId,
            nombre,
            descripcion
        });
    } catch (error) {
        console.log(error);   
    }
}
export const obtenerEquipos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM equipos');
        res.json(rows);
    } catch (error) {
        console.log(error)
    }
}

export const obtenerEquipo = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM equipos WHERE id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Equipo no encontrado'
        })
        res.json(rows[0]);
    } catch (error) {
        console.log(error)
    }
}

export const actualizarEquipo = async (req, res) => {
    const { nombre, descripcion, proyecto } = req.body;
    try {
        const [result] = await pool.query('UPDATE equipos SET nombre = ?, descripcion = ?, proyecto_id = ? WHERE id = ?', [nombre, descripcion, proyecto, req.params.id])
        if (result.affectedRows === 0) return res.status(404).json({"message": "Usuario no encontrado"})
        return res.json({
            id: req.params.id,
            nombre,
            descripcion,
            proyecto
        })

    } catch (error) {
        console.log(error)
    }
}

export const eliminarEquipo = async (req, res) => {
    try {
        const [rows] = await pool.query('DELETE FROM equipos WHERE id = ?', [req.params.id]);
        if (rows.affectedRows <= 0) return res.status(404).json({"message": "Usuario no encontrado"})
        res.sendStatus(204);
    } catch (error) {
        console.log(error)
    }

}
