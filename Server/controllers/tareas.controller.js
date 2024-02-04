import { pool } from '../db.js'

//Formatear como yyyy-mmm-dd
function formatearFecha2(fecha) {
    const date = new Date(fecha);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ('0' + date.getDate()).slice(-2);
    const fechaFormateada = `${year}-${month}-${day}`;
    return fechaFormateada;
}

export const agregarTarea = async (req, res) => {
    const { nombre, descripcion, estado, fecha_inicio, fecha_fin, usuario, equipo, proyecto_id } = req.body;
    console.log(req.body);
    try {
        const [rows] = await pool.query('INSERT INTO tareas (nombre, descripcion, fecha_inicio, fecha_fin, estado, usuario_id, equipo_id, proyecto_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nombre, descripcion, fecha_inicio, fecha_fin, estado, usuario, equipo, proyecto_id]);
        res.json({
            id: rows.insertId,
            nombre,
            descripcion,
            fecha_inicio,
            fecha_fin,
            estado,
            usuario,
            equipo,
            proyecto_id
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

export const obtenerTareasUsuario = async (req, res) => {
    try {
        //Obtener cantidad de tareas todas, completadas, en proceso y suspendidas
        const [todasTareas] = await pool.query('SELECT COUNT(*) AS Tareas FROM tareas WHERE usuario_id = ?;', [req.params.id]);
        const [tareasCompletadas] = await pool.query('SELECT COUNT(*) AS Completadas FROM tareas WHERE usuario_id = ? AND (estado = 2 OR estado = "Terminado");', [req.params.id]);
        const [tareasEnProceso] = await pool.query('SELECT COUNT(*) AS EnProceso FROM tareas WHERE usuario_id = ? AND (estado = 1 OR estado = "En proceso");', [req.params.id]);
        const [tareasSuspendidas] = await pool.query('SELECT COUNT(*) AS Suspendidas FROM tareas WHERE usuario_id = ? AND (estado = 3 OR estado = "Suspendido");', [req.params.id]);
        const cantidades = {
            todas: todasTareas[0].Tareas,
            completadas: tareasCompletadas[0].Completadas,
            enProceso: tareasEnProceso[0].EnProceso,
            suspendidas: tareasSuspendidas[0].Suspendidas
        }
        const [tareas] = await pool.query('SELECT * FROM tareas WHERE usuario_id = ?', [req.params.id]);
        res.json({ tareas, cantidades });
    } catch (error) {
        console.log(error);
    }
}

export const obtenerTareasEquipoProyecto = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tareas WHERE equipo_id = ? AND proyecto_id = ?', [req.params.equipo, req.params.proyecto]);
        res.json(rows);
    } catch (error) {
        console.log(error);
    }
}

export const obtenerTareasEquipo = async (req, res) => {
    console.log(req.params.equipo_id)
    try {
        const [rows] = await pool.query('SELECT * FROM tareas WHERE equipo_id = ?', [req.params.equipo_id]);
        if (rows.length <= 0) return res.status(404).json({ message: 'Tarea no encontrada' });
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

export const obtenerTareaProyecto = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM tareas WHERE proyecto_id = ?', [req.params.proyecto]);
        if (rows.length <= 0) return res.status(404).json({ message: 'Tarea no encontrada' });
        res.json(rows);
    } catch (error) {
        console.log(error);
    }
}

export const editarTarea = async (req, res) => {
    const { nombre, descripcion, fecha_inicio, fecha_fin, estado, usuario } = req.body;
    console.log(req.body)


    try {

        const [result] = await pool.query('UPDATE tareas SET nombre = ?, descripcion = ?, fecha_inicio = ?, fecha_fin = ?, estado = ?, usuario_id = ? WHERE id = ?', [nombre, descripcion, fecha_inicio, fecha_fin, estado, usuario, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada' });
        const [rows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [req.params.id]);
        res.json(rows[0]);

    } catch (error) {
        console.log(error);
    }
}

export const editarEstadoTarea = async (req, res) => {
    const { estado } = req.body;
    try {
        const [result] = await pool.query('UPDATE tareas SET estado = ? WHERE id = ?', [estado, req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Tarea no encontrada' });
        const [rows] = await pool.query('SELECT * FROM tareas WHERE id = ?', [req.params.id]);
        res.json(rows[0]);
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