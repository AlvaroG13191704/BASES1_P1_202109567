export const createTablesScript = `
-- Tables without a Foreign keys
-- TABLE OF CIUDADANO
CREATE TABLE IF NOT EXISTS CIUDADANO (
    dpi VARCHAR(13) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL ,
    telefono VARCHAR(10) NOT NULL,
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
`;


export const deleteTablesScript = `
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
`;


export const createTempTablesScript = `
-- Create temporary tables
-- TABLE OF TEMCIUDADANO
CREATE TEMPORARY TABLE TEMCIUDADANO(
    dpi VARCHAR(13) NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    direccion VARCHAR(50) NOT NULL ,
    telefono VARCHAR(10) NOT NULL,
    genero VARCHAR(1) NOT NULL
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
`;


export const deleteTempTablesScript = `
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

`;