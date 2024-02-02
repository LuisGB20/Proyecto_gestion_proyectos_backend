import { pool } from '../db.js';

export const agregarEquipo = async (req, res) => {
    const { nombre, descripcion, proyecto, miembros } = req.body;

    try {
        // Insertar el equipo
        const [equipoRows] = await pool.query('INSERT INTO equipos (nombre, descripcion, proyecto_id) VALUES (?, ?, ?)', [nombre, descripcion, proyecto]);

        const equipoId = equipoRows.insertId;
        // Asociar miembros con el equipo
        if (miembros && miembros.length > 0) {
            // Actualizar los usuarios con el nuevo equipo_id
            const updatePromises = miembros.map((miembro) =>
                pool.query('UPDATE usuarios SET equipo_id = ? WHERE id = ?', [equipoId, miembro.id])
            );

            await Promise.all(updatePromises);
        }
        res.json({
            id: equipoId,
            nombre,
            descripcion,
            proyecto_id: proyecto,
            miembros: miembros || [],
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al agregar el equipo.' });
    }
};

export const obtenerEquipos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT equipos.id, equipos.nombre AS nombreEquipo, equipos.descripcion as equipoDescripcion, proyectos.nombre as nombreproyecto, proyectos.fecha_inicio as fechaComienzo FROM equipos INNER JOIN proyectos ON equipos.proyecto_id = proyectos.id;');
        res.json(rows);
    } catch (error) {
        console.log(error)
    }
}

export const obtenerEquipo = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT equipos.id as idEquipo, equipos.nombre as equipoNombre, equipos.descripcion as equipoDescripcion, proyectos.nombre as proyectoNombre, proyectos.fecha_inicio, (concat(usuarios.nombre , " " , usuarios.apellido)) as miembros, usuarios.id as idUsuario  FROM equipos INNER JOIN proyectos ON equipos.proyecto_id = proyectos.id INNER JOIN usuarios ON proyectos.id = usuarios.equipo_id WHERE equipos.id = ?', [req.params.id]);
        if (rows.length <= 0) return res.status(404).json({
            message: 'Equipo no encontrado'
        })
        res.json(rows);
    } catch (error) {
        console.log(error)
    }
}

export const actualizarEquipo = async (req, res) => {
    const { nombre, descripcion } = req.body;
    try {
        const [result] = await pool.query('UPDATE equipos SET nombre = ?, descripcion = ? WHERE id = ?', [nombre, descripcion, req.params.id])
        if (result.affectedRows === 0) return res.status(404).json({"message": "Usuario no encontrado"})
        return res.json({
            id: req.params.id,
            nombre,
            descripcion
        })

    } catch (error) {
        console.log(error)
    }
}

export const eliminarEquipo = async (req, res) => {
    const equipoId = Number(req.params.id);

    try {
        // Actualizar usuarios asociados al equipo para establecer equipo_id en NULL
        await pool.query('UPDATE usuarios SET equipo_id = NULL WHERE equipo_id = ?', [equipoId]);

        // Eliminar el equipo
        const [rows] = await pool.query('DELETE FROM equipos WHERE id = ?', [equipoId]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "Equipo no encontrado" });
        }

        res.sendStatus(204);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el equipo.' });
    }
};

