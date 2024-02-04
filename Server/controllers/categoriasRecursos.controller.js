import {pool} from '../db.js'

export const obtenerCategoriasRecursos = async (req, res) => {
    try {
        const[categorias] = await pool.query('SELECT * FROM categorias;')
        res.json(categorias)
    } catch (error) {
        console.log(error)
    }
}