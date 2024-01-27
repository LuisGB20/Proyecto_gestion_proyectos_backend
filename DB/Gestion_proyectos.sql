CREATE DATABASE gestion_proyectos;

USE gestion_proyectos;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    email VARCHAR(50),
    contraseña VARCHAR(50),
    pregunta_seguridad VARCHAR(50),
    respuesta_seguridad VARCHAR(50),
    token VARCHAR(10),
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE roles(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    permisos JSON
);

CREATE TABLE equipos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(50),
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE equipos_miembros(
    id INT AUTO_INCREMENT PRIMARY KEY,
    equipo_id INT,
    usuario_id INT,
    FOREIGN KEY (equipo_id) REFERENCES equipos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE proyectos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(50),
    fecha_inicio DATE,
    fecha_fin DATE,
    estado ENUM('En proceso', 'Terminado', 'Suspendido'),
    equipo_id INT,
    FOREIGN KEY (equipo_id) REFERENCES equipos(id)
);

-- DROP TABLE estados;
-- CREATE TABLE estados(
    -- id INT AUTO_INCREMENT PRIMARY KEY,
    -- nombre VARCHAR(50)
-- );

CREATE TABLE proyectos_equipos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    proyecto_id INT,
    equipo_id INT,
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
    FOREIGN KEY (equipo_id) REFERENCES equipos(id)
);

CREATE TABLE mensajes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    mensaje VARCHAR(50),
    fecha DATETIME,
    usuario_id INT,
    proyecto_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
);

CREATE TABLE categorias(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(50)
);

CREATE TABLE recursos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(50),
    disponibilidad ENUM('Disponible', 'No disponible'),
    tipo ENUM('Recurso', 'Activo'),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE solicitudes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_solicitud DATE,
    miembro_id INT,
    proyecto_id INT,
    recurso_id INT,
    FOREIGN KEY (miembro_id) REFERENCES equipos_miembros(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
    FOREIGN KEY (recurso_id) REFERENCES recursos(id)
);

CREATE TABLE evaluaciones_recursos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha_evaluacion DATE,
    comentario VARCHAR(255),
    miembro_id INT,
    proyecto_id INT,
    solicitud_id INT,
    FOREIGN KEY (miembro_id) REFERENCES equipos_miembros(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
    FOREIGN KEY (solicitud_id) REFERENCES solicitudes(id)
);
    