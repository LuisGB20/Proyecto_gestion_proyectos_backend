import { pool } from '../db.js'
import { hashearContra, compararPassword } from '../utils/hash.js';

export const agregarUsuario = async (req, res) => {
    const { nombre, apellido, email, contrasena, equipo, pregunta_seguridad, respuesta_seguridad, rol_id } = req.body
    console.log(req.body)
    const usuarioExistente = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email])
    if (usuarioExistente[0].length > 0) {
        return res.status(400).json({
            message: 'El usuario ya existe'
        })
    }
    try {
        const contrasenaHash = hashearContra(contrasena)
        const [rows] = await pool.query('INSERT INTO usuarios (nombre, apellido, email, contraseña, equipo_id, pregunta_seguridad, respuesta_seguridad, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [nombre, apellido, email, contrasenaHash, equipo, pregunta_seguridad, respuesta_seguridad, rol_id])
        return res.json({
            id: rows.insertId,
            nombre,
            apellido,
            email,
            contrasenaHash,
            equipo,
            pregunta_seguridad,
            respuesta_seguridad,
            rol_id
        })
    } catch (error) {
        console.log(error);
    }
}

export const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT usuarios.id, usuarios.nombre, usuarios.apellido, roles.nombre as rol, equipos.nombre as equipo FROM usuarios INNER JOIN roles ON usuarios.rol_id = roles.id LEFT JOIN equipos ON usuarios.equipo_id = equipos.id;')
        return res.json(rows)
    } catch (error) {
        console.log(error)
    }
}

export const obtenerUsuariosEquipo = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT usuarios.id, usuarios.nombre, usuarios.apellido, roles.nombre as rol, equipos.nombre as equipo FROM usuarios INNER JOIN roles ON usuarios.rol_id = roles.id LEFT JOIN equipos ON usuarios.equipo_id = equipos.id WHERE equipos.id = ?', [req.params.equipo])
        return res.json(rows)
    } catch (error) {
        console.log(error)
    }
}

export const obtenerUsuariosNoJefes = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE rol_id <> 1;')
        return res.json(rows)
    } catch (error) {
        console.log(error)
    }
}

export const obtenerUsuario = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT usuarios.id, usuarios.nombre, usuarios.apellido, usuarios.email, roles.nombre as rol, roles.permisos, equipos.nombre as equipo FROM usuarios INNER JOIN roles ON usuarios.rol_id = roles.id LEFT JOIN equipos ON usuarios.equipo_id = equipos.id WHERE usuarios.id = ?', [req.params.id])
        return res.json(rows[0])
    } catch (error) {
        console.log(error)
    }
}

export const actualizarUsuario = async (req, res) => {
    const { nombre, apellido, email, contrasena, equipo, rol } = req.body
    console.log(req.body)

    //Obtener roles
    const [roles] = await pool.query('SELECT * FROM roles WHERE nombre = ?', [rol])
    const rol_id = roles[0].id;

    // Obtener equipos 
    const [equipos] = await pool.query('SELECT * FROM equipos WHERE nombre = ?', [equipo])
    const equipo_id = equipos[0].id;

    // //Consulta contraseña usuario
    // const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [req.params.id])
    // const contrasenaUsuario = rows[0].contraseña;
    // console.log(contrasenaUsuario)
    // //verificamos si cambio la contraseña
    // const cambioContrasena = compararPassword(contrasena, contrasenaUsuario)
    //     ? contrasenaUsuario : hashearContra(contrasena);  //si no cambio la contraseña, la hasheamos y la guardamos en la base de datos
    // console.log(cambioContrasena)
    try {
        const [rows] = await pool.query('UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, equipo_id = ?, rol_id = ? WHERE id = ?', [nombre, apellido, email, equipo_id, rol_id, req.params.id])
        return res.json({
            id: req.params.id,
            nombre,
            apellido,
            email,
            equipo_id,
            rol_id
        })
    } catch (error) {
        console.log(error)
    }
}

export const eliminarUsuario = async (req, res) => {
    try {
        const [resultado] = await pool.query('DELETE FROM usuarios WHERE id = ?', [req.params.id])
        console.log(resultado)
        if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: "Usuario no encontrado" })
        return res.sendStatus(204);
    } catch (error) {
        console.log(error)
    }
}