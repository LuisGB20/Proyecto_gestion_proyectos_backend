// hash de contraseñas
import bcrypt from 'bcrypt';

export const hashearContra = (password) => {
    return bcrypt.hashSync(password, 10);
}

export const compararPassword = (password, hash) => {
    console.log(password);
    console.log(hash);
    return bcrypt.compareSync(password, hash);
}