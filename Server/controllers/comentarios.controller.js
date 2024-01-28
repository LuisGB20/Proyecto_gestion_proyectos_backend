import { pool } from '../db.js'

export const agregarComentario = async (req, res) => {
    const fecha = new Date();
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();
    const segundos = fecha.getSeconds();
    const fechaFormateada = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;
    console.log(fechaFormateada);
    try {
        const {mensaje, usuario, proyecto} = req.body;
        const [result] = await pool.query('INSERT INTO mensajes (mensaje, fecha, usuario_id, proyecto_id) VALUES (?, ?, ?, ?)', [mensaje, fechaFormateada, usuario, proyecto]);
        res.json({
            id: result.insertId,
            mensaje,
            fechaFormateada,
            usuario,
            proyecto
        })
    } catch (error) {
        console.log(error);
    }
}

export const obtenerComentarios = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM mensajes');
        res.json(results);
    } catch (error) {
        console.log(error);
    }
}

export const obtenerComentario = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM mensajes WHERE id = ?', [req.params.id]);
        if (result.length > 0) {
            res.json(result[0]);
        }
        else {
            res.status(404).json({ message: 'Comentario no encontrado' });
        }
    } catch (error) {
        console.log(error);
    }
}

export const editarComentario = async (req, res) => {
    const {mensaje} = req.body;
    try {
        const [result] = await pool.query('UPDATE mensajes SET mensaje = ? WHERE id = ?', [mensaje, req.params.id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.json({
            id: req.params.id,
            mensaje
        })
    } catch (error) {
        console.log(error);
    }
}

export const eliminarComentario = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM mensajes WHERE id = ?', [req.params.id]);
        if (result.affectedRows === 0) {
            res.status(404).json({ message: 'Comentario no encontrado' });
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error)
    }
}