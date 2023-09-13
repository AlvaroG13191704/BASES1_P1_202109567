-- CREATE DATABASE
CREATE DATABASE IF NOT EXISTS proyecto1;

USE proyecto1;

-- Tables without a Foreign keys
-- TABLE OF CIUDADANO
CREATE TABLE IF NOT EXISTS CIUDADANO (
    dpi VARCHAR(13) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL ,
    telefono VARCHAR(10) NOT NULL,
    edad INTEGER NOT NULL,
    genero VARCHAR(1) NOT NULL,
    PRIMARY KEY (dpi)
);

-- TABLE OF CARGO
CREATE TABLE  IF NOT EXISTS CARGO (
    id_cargo INTEGER NOT NULL,
    cargo VARCHAR(50) NOT NULL ,
    PRIMARY KEY (id_cargo)
);

-- TABLE OF PARTIDO
CREATE TABLE IF NOT EXISTS PARTIDO (
    id_partido INTEGER NOT NULL ,
    nombre_partido VARCHAR(100) NOT NULL ,
    siglas VARCHAR(10) NOT NULL ,
    fundacion DATE NOT NULL,
    PRIMARY KEY (id_partido)
);

-- TABLE OF DEPARTAMENTO
CREATE TABLE IF NOT EXISTS DEPARTAMENTO(
  id_departamento INTEGER NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(20) NOT NULL ,
  PRIMARY KEY (id_departamento)
);

-- Foreign keys
-- TABLE OF MESA
CREATE TABLE IF NOT EXISTS MESA(
  id_mesa INTEGER NOT NULL,
  id_departamento INTEGER NOT NULL ,
  PRIMARY KEY (id_mesa),
  FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTO(id_departamento)
);

-- TABLE OF VOTO
CREATE TABLE IF NOT EXISTS VOTO(
  id_voto INTEGER NOT NULL,
  datetime DATETIME NOT NULL ,
  dpi VARCHAR(13) NOT NULL ,
  id_mesa INTEGER NOT NULL ,
  PRIMARY KEY (id_voto),
  FOREIGN KEY (dpi) REFERENCES CIUDADANO(dpi),
  FOREIGN KEY (id_mesa) REFERENCES MESA(id_mesa)
);

-- TABLE OF CANDIDATO
CREATE TABLE IF NOT EXISTS CANDIDATO(
  id_candidato INTEGER NOT NULL,
  nombres VARCHAR(100) NOT NULL ,
  fecha_nacimiento DATE NOT NULL ,
  id_partido INTEGER NOT NULL ,
  id_cargo INTEGER NOT NULL ,
  PRIMARY KEY (id_candidato),
  FOREIGN KEY (id_partido) REFERENCES PARTIDO(id_partido),
  FOREIGN KEY (id_cargo) REFERENCES  CARGO(id_cargo)
);

-- TABLE OF DETALLE_VOTO
CREATE TABLE IF NOT EXISTS DETALLE_VOTO(
  id_detalle INTEGER NOT NULL AUTO_INCREMENT,
  id_voto INTEGER NOT NULL ,
  id_candidato INTEGER NOT NULL ,
  PRIMARY KEY (id_detalle),
  FOREIGN KEY (id_voto) REFERENCES VOTO(id_voto),
  FOREIGN KEY (id_candidato) REFERENCES CANDIDATO(id_candidato)
);

-- TABLE OF DETALLE_VOTO
DROP TABLE IF EXISTS DETALLE_VOTO;

-- TABLE OF CANDIDATO
DROP TABLE IF EXISTS CANDIDATO;

-- TABLE OF VOTO
DROP TABLE IF EXISTS VOTO;

-- TABLE OF MESA
DROP TABLE IF EXISTS MESA;

-- TABLE OF DEPARTAMENTO
DROP TABLE IF EXISTS DEPARTAMENTO;

-- TABLE OF PARTIDO
DROP TABLE IF EXISTS PARTIDO;

-- TABLE OF CARGO
DROP TABLE IF EXISTS CARGO;

-- TABLE OF CIUDADANO

DROP TABLE IF EXISTS CIUDADANO;

-- Create temporary tables
-- TABLE OF TEMCIUDADANO
CREATE TEMPORARY TABLE TEMCIUDADANO(
    dpi VARCHAR(13) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL ,
    telefono VARCHAR(10) NOT NULL,
    genero VARCHAR(1) NOT NULL,
    edad INTEGER NOT NULL
);

-- TABLE OF TEMCARGO
CREATE TEMPORARY TABLE TEMCARGO(
    id_cargo INTEGER NOT NULL,
    cargo VARCHAR(50) NOT NULL
);

-- TABLE OF TEMPARTIDO
CREATE TEMPORARY TABLE TEMPARTIDO(
    id_partido INTEGER NOT NULL ,
    nombre_partido VARCHAR(100) NOT NULL ,
    siglas VARCHAR(10) NOT NULL ,
    fundacion DATE NOT NULL
);

-- TABLE OF TEMDEPARTAMENTO
CREATE TEMPORARY TABLE TEMDEPARTAMENTO(
    nombre VARCHAR(20) NOT NULL
);

-- TABLE OF TEMMESA
CREATE TEMPORARY TABLE TEMMESA(
    id_mesa INTEGER NOT NULL,
    id_departamento INTEGER NOT NULL
);

-- TABLE OF TEMVOTO
CREATE TEMPORARY TABLE TEMVOTO(
  id_voto INTEGER NOT NULL,
  datetime DATETIME NOT NULL ,
  dpi VARCHAR(13) NOT NULL ,
  id_mesa INTEGER NOT NULL
);
-- TABLE OF TEMCANDIDATO
CREATE TEMPORARY TABLE TEMCANDIDATO(
  id_candidato INTEGER NOT NULL,
  nombres VARCHAR(100) NOT NULL ,
  fecha_nacimiento DATE NOT NULL ,
  id_partido INTEGER NOT NULL ,
  id_cargo INTEGER NOT NULL
);
-- TABLE OF TEMDETALLE_VOTO
CREATE TEMPORARY TABLE TEMDETALLE_VOTO(
  id_voto INTEGER NOT NULL ,
  id_candidato INTEGER NOT NULL
);

-- Delete temporary tables
-- TABLE OF TEMDETALLE_VOTO
DROP TABLE IF EXISTS TEMDETALLE_VOTO;

-- TABLE OF TEMCANDIDATO
DROP TABLE IF EXISTS TEMCANDIDATO;

-- TABLE OF TEMVOTO
DROP TABLE IF EXISTS TEMVOTO;

-- TABLE OF TEMMESA
DROP TABLE IF EXISTS TEMMESA;

-- TABLE OF TEMDEPARTAMENTO
DROP TABLE IF EXISTS TEMDEPARTAMENTO;

-- TABLE OF TEMPARTIDO
DROP TABLE IF EXISTS TEMPARTIDO;

-- TABLE OF TEMCARGO
DROP TABLE IF EXISTS TEMCARGO;

-- TABLE OF TEMCIUDADANO

DROP TABLE IF EXISTS TEMCIUDADANO;


-- QUERIES
-- query 1
SELECT CP.nombres as presidente,
       CV.nombres as vicepresidente,
       P1.nombre_partido as partido
FROM CANDIDATO CP -- tabla candidato
JOIN PARTIDO P1 ON CP.id_partido = P1.id_partido
JOIN CARGO CP_cargo ON CP.id_cargo = CP_cargo.id_cargo
JOIN CANDIDATO CV ON CV.id_partido = P1.id_partido
JOIN CARGO CV_cargo ON CV.id_cargo = CV_cargo.id_cargo
WHERE CP_cargo.cargo = 'presidente' AND CV_cargo.cargo = 'vicepresidente';

-- query 2
SELECT
    P.nombre_partido AS Partido,
    COUNT(C.id_candidato) AS 'Cantidad de diputados'
FROM
    PARTIDO P
LEFT JOIN
    CANDIDATO C ON P.id_partido = C.id_partido
LEFT JOIN
    CARGO CG ON C.id_cargo = CG.id_cargo
WHERE
    CG.id_cargo = 3 OR CG.id_cargo = 4 OR CG.id_cargo = 5
GROUP BY
    P.nombre_partido;

-- query 3
SELECT
    P.nombre_partido AS Partido,
    C.nombres AS Alcalde
FROM
    PARTIDO P
LEFT JOIN
    CANDIDATO C ON P.id_partido = C.id_partido
LEFT JOIN
    CARGO CG ON C.id_cargo = CG.id_cargo
WHERE
    CG.id_cargo = 6;

-- query 4
SELECT
    P.nombre_partido AS Partido,
    COUNT(C.id_candidato) AS Candidatos
FROM
    PARTIDO P
LEFT JOIN
    CANDIDATO C ON P.id_partido = C.id_partido
LEFT JOIN
    CARGO CG ON C.id_cargo = CG.id_cargo
WHERE
    CG.id_cargo IN (1,2,3,4,5,6)
GROUP BY
    P.nombre_partido;

-- Query 5
SELECT
    D.nombre AS Departamento,
    COUNT(V.id_voto) AS Votos
FROM
    DEPARTAMENTO D
LEFT JOIN
    MESA M ON D.id_departamento = M.id_departamento
LEFT JOIN
    VOTO V ON M.id_mesa = V.id_mesa
GROUP BY
    D.nombre;

-- Query 6
SELECT
    COUNT(*) AS 'Votos nulos'
FROM
    DETALLE_VOTO DV
WHERE
    DV.id_candidato = -1;

SELECT * FROM CIUDADANO;
-- Query 7
SELECT C.edad AS Edad,
       COUNT(V.id_voto) AS Cantidad
FROM CIUDADANO C
LEFT JOIN
    VOTO V on C.dpi = V.dpi
GROUP BY
    C.edad
ORDER BY
    Cantidad DESC
LIMIT 10;

-- Query 8
SELECT
    CONCAT(Presi.nombres, ' (Presidente)') AS Candidato,
    COUNT(*) AS Cantidad_Votos
FROM
    DETALLE_VOTO DV
INNER JOIN
    CANDIDATO Presi ON DV.id_candidato = Presi.id_candidato
INNER JOIN
    CANDIDATO Vp ON Presi.id_partido = Vp.id_partido AND Vp.id_cargo = 2
WHERE
    Presi.id_cargo = 1
GROUP BY
    Candidato
ORDER BY
    Cantidad_Votos DESC
LIMIT 10;

-- Query 9
SELECT
    M.id_mesa AS Mesa,
    D.nombre AS Departamento,
    COUNT(*) AS Votos
FROM MESA M
INNER JOIN DEPARTAMENTO D on M.id_departamento = D.id_departamento
INNER JOIN VOTO V on M.id_mesa = V.id_mesa
GROUP BY M.id_mesa, D.nombre
ORDER BY Votos DESC
LIMIT 5;

-- Query 10
SELECT
    DATE_FORMAT(datetime, '%H:%i') AS Hora,
    COUNT(*) AS Cantidad_Votantes
FROM
    VOTO
GROUP BY
    Hora
ORDER BY
    Cantidad_Votantes DESC
LIMIT 5;

-- Query 11
SELECT
    CASE
        WHEN genero = 'F' THEN 'Femenino'
        WHEN genero = 'M' THEN 'Masculino'
    END AS Genero,
    COUNT(*) AS Cantidad_Votos
FROM
    CIUDADANO C
INNER JOIN
    VOTO V ON C.dpi = V.dpi
GROUP BY
    genero;