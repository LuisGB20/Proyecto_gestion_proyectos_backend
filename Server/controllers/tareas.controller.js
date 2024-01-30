import { pool } from "../db.js";

export const agregarTarea = async (req, res) => {
    const {titulo, estatus, fecha_inicio, fecha_finalizacion, responsable_id, proyecto_id} = req.body;
    const [result] = await pool.query('INSERT INTO tareas (titulo, ) VALUES (?)',  [titulo]) 
    try {
        
    } catch (error) {
        console.log(error);
    }
}

export const obtenerTarea = async (req, res) => {
    
}

export const obtenerTareas = async (req, res) => {
    
}

export const editarTarea = async (req, res) => {
    
}

export const eliminarTarea = async (req, res) => {
    
}