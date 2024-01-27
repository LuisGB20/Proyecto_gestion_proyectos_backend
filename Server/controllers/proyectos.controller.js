import { pool } from "../db.js";

export const agregarProyecto = async (req, res) => {
    const {nombre, descripcion, fecha_inicio, fecha_fin, estado} = req.body;
    try {
        const [result] = await pool.query('INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin, estado) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, fecha_inicio, fecha_fin, estado]);
        res.json({
            id: result.insertId,
            nombre,
            descripcion,
            fecha_inicio,
            fecha_fin,
            estado
        })
    } catch (error) {
        console.log(error);
    }
}

export const obtenerProyectos = async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM proyectos');
        if(results.length === 0){
            res.status(404).json({message: 'No hay proyectos'})
        }
        res.json(results);
    } catch (error) {
        console.log(error)
    }
}

export const obtenerProyecto = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM proyectos WHERE id = ?', [req.params.id]);
        if(result.length === 0){
            res.status(404).json({message: 'No existe ese proyecto'})
        }
        res.json(result[0]);
    } catch (error) {
        console.log(error)
    }
}

export const actualizarProyecto = async (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_fin, estado } = req.body;
    try {
        const [result] = await pool.query('UPDATE proyectos SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id = ?', [nombre, descripcion, fecha_inicio, fecha_fin, estado, req.params.id])
        if(result.affectedRows === 0){
            res.status(404).json({message: 'No existe ese proyecto'})
        }
        res.json({
            id: req.params.id,
            nombre,
            descripcion,
            fecha_inicio,
            fecha_fin,
            estado
        });
    } catch (error) {
        console.log(error)
    } 
}

export const eliminarProyecto = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM proyectos WHERE id = ?', [req.params.id]);
        if(result.affectedRows === 0){
            res.status(404).json({message: 'No existe ese proyecto'})
        }
        res.sendStatus(204);
    } catch (error) {
        console.log(error)
    }
}