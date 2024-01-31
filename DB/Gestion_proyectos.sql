CREATE DATABASE gestion_proyectos;

USE gestion_proyectos;

-- SET FOREIGN_KEY_CHECKS = 0;
-- SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    email VARCHAR(50),
    contraseña VARCHAR(50),
    equipo_id INT,
    pregunta_seguridad VARCHAR(50),
    respuesta_seguridad VARCHAR(50),
    token VARCHAR(10),
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id),
	FOREIGN KEY (equipo_id) REFERENCES equipos(id)
);


CREATE TABLE roles(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    permisos JSON
);

select * from equipos;
CREATE TABLE equipos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(50),
    proyecto_id INT,
    FOREIGN KEY(proyecto_id) REFERENCES proyectos(id)
);

CREATE TABLE proyectos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(50),
    fecha_inicio DATE,
    fecha_fin DATE,
    estado ENUM('En proceso', 'Terminado', 'Suspendido')
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
    FOREIGN KEY (miembro_id) REFERENCES usuarios(id),
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
    FOREIGN KEY (miembro_id) REFERENCES usuarios(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
    FOREIGN KEY (solicitud_id) REFERENCES solicitudes(id)
);
<<<<<<< HEAD

CREATE TABLE tareas (
    id INT  NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    titulo VARCHAR(100) NOT NULL,
    estatus  ENUM ('Pendiente','En progreso','Finalizada') DEFAULT 'Pendiente',
    fecha_inicio DATETIME,
    fecha_finalizacion DATETIME,
    responsable_id INT,
    proyecto_id INT,
    FOREIGN KEY (responsable_id) REFERENCES usuarios(id),
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id)
)
=======
    
CREATE TABLE tareas(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion VARCHAR(50),
    fecha_inicio DATE,
    fecha_fin DATE,
    estado ENUM('En proceso', 'Terminado', 'Suspendido')
    usuario_id INT,
    proyecto_id INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    FOREIGN KEY (proyecto_id) REFERENCES proyectos(id),
);
>>>>>>> 0ea49ace5ddf1fbf95f4ffad26f613d58aef7856
