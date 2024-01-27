import jwt from "jsonwebtoken";
import randomstring from 'randomstring';
import nodemailer from 'nodemailer';
import { hashearContra, compararPassword } from "../utils/hash.js";
import { pool } from "../db.js";

// Genera un código de verificación
const generarCodigoVerificacion = () => {
    return randomstring.generate(6);
};

const enviarCorreo = async (correo, codigo) => {
    console.log("Enviando correo")
    // Configurar el transporter de correo electrónico
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'infodreamx2023@gmail.com',
            pass: 'acyoatlvlxgwfoxx',
        },
    });

  // Configuración del mensaje de correo electrónico
  const mensaje = {
    from: 'infodreamx2023@gmail.com',
    to: correo,
    subject: 'Código de verificación',
    html: `
    <p style="font-size: 16px; color: #333; line-height: 1.6;">¡Hola!</p>
    <p style="font-size: 18px; color: #00568D; line-height: 1.6;">Conitnua con tu proceso de verificación.</p>
    <p style="font-size: 16px; color: #333; line-height: 1.6;">Tu código de verificación es:</p>
    <h2 style="font-size: 24px; color: #00568D; margin-bottom: 20px;">${codigo}</h2>
    <p style="font-size: 16px; color: #333; line-height: 1.6;">¡Gracias por confiar en nosotros!</p>
    <p style="font-size: 16px; color: #333; line-height: 1.6;">El equipo de ProManSys</p>    
    `,
  };
  try {
    // Enviar el correo
    const info = await transporter.sendMail(mensaje);
    console.log(info);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}

//Registro
export const register = async (req, res) => {
    const { nombre, apellido, email, contrasena, pregunta_seguridad, respuesta_seguridad, rol_id } = req.body;
    console.log(req.body)
    try {
        const [rows2] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows2.length === 0) {
            const contraseñaHasheada = hashearContra(contrasena)
            console.log(contraseñaHasheada)
            const [rows] = await pool.query("INSERT INTO usuarios (nombre, apellido, email, contraseña, pregunta_seguridad, respuesta_seguridad, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?)", [nombre, apellido, email, contraseñaHasheada, pregunta_seguridad, respuesta_seguridad, rol_id]);
            res.json({
                id: rows.insertId,
                nombre,
                apellido,
                email,
                contraseñaHasheada,
                pregunta_seguridad,
                respuesta_seguridad,
                rol_id
            });
        } else {
            return res.status(400).json({ message: "El correo ya está en uso" });
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Login 

// Verificar usuario y contraseña
export const login = async (req, res) => {
    const { email, contrasena } = req.body;
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const usuario = rows[0];
        const comparacionContra = compararPassword(contrasena, usuario.contraseña)
        if (comparacionContra) {
            const token = jwt.sign({ id: usuario.id }, "secretkey");
            return res.json({ token });
        } else {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Verificar correo

export const verificarCorreo = async (req, res) => {
    const codigo = generarCodigoVerificacion();
    const { email } = req.body;
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const usuario = rows[0];
        await enviarCorreo(email, codigo);
        const actualizarToken = await pool.query("UPDATE usuarios SET token = ? WHERE id = ?", [codigo, usuario.id]);
        console.log(actualizarToken)
        return res.json({ message: "Correo enviado" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const vericarCodigo = async (req, res) => {
    const { codigo } = req.body;
    console.log(codigo)
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE token = ?", [codigo]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Codigo no encontrado" });
        }
        const usuario = rows[0];
        const actualizarToken = await pool.query("UPDATE usuarios SET token = NULL WHERE id = ?", [usuario.id]);
        return res.json({ message: "Codigo verificado" });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


// Verificar pregunta de seguridad
export const verificarPregunta = async (req, res) => {
    const { email, pregunta_seguridad, respuesta_seguridad } = req.body;
    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        const usuario = rows[0];
        if (usuario.pregunta_seguridad === pregunta_seguridad && usuario.respuesta_seguridad === respuesta_seguridad) {
            const token = jwt.sign({ id: usuario.id }, "secretkey");
            return res.json({ token });
        } else {
            return res.status(401).json({ message: "Pregunta de seguridad incorrecta" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
 }