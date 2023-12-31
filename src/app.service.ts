import { Injectable } from '@nestjs/common';
import path = require('path');
const fs = require('fs');
import { DatabaseService } from './database/database.service';
const departamentosFilePath = path.join(__dirname,  '../src/files/departamentos.csv');
const cargosFilePath = path.join(__dirname,  '../src/files/cargos.csv');
const partidosFilePath = path.join(__dirname,  '../src/files/partidos.csv');
const candidatosFilePath = path.join(__dirname,  '../src/files/candidatos.csv');
const ciudadanosFilePath = path.join(__dirname,  '../src/files/ciudadanos.csv');
const votosFilePath = path.join(__dirname,  '../src/files/voto.csv');
const detalle_votosFilePath = path.join(__dirname,  '../src/files/detalle_voto.csv');
const mesasFilePath = path.join(__dirname,  '../src/files/mesas.csv');

@Injectable()
export class AppService {

  constructor(
    private readonly database: DatabaseService,
  ){}

  cleanData(script: string){
    const data = script.replace(/(--.*)/g, '');
    const listTables = data.split(";").map(command => command.trim());
    return listTables;
  }

  async createTables(script: string){
    // charge files then send to database
    const listTables = this.cleanData(script);

    return this.database.createTablesDB(listTables);
  }

  async deleteTables(script: string){
    // charge files then send to database
    const listTables = this.cleanData(script);

    return this.database.deleteTablesDB(listTables);
  }

  async chargeTemp(createScript: string, deleteScript: string){

    await this.createTables(createScript);

    let listTemQueries = [];
    // charge values from csv files
    const dataDepartamentos = fs.readFileSync(departamentosFilePath, 'utf8');
    let lines = dataDepartamentos.split("\n")
    for(let i = 1; i < lines.length; i++){
      const line = lines[i].split(",");
      const name = line[1];
      if (name) {
        const temQuery = `INSERT INTO TEMDEPARTAMENTO (nombre) VALUES ('${name}');`;
        listTemQueries.push(temQuery);
      }
    }
    let finalQuery = `INSERT INTO DEPARTAMENTO (nombre) SELECT nombre FROM TEMDEPARTAMENTO;`;
    await this.database.loadDataDB(listTemQueries, finalQuery);
    console.log('Departamentos loaded');

    listTemQueries = [];
    const dataCargos = fs.readFileSync(cargosFilePath, 'utf8');
    lines = dataCargos.split("\n")
    for(let i = 1; i < lines.length; i++){
      const line = lines[i].split(",");
      const id = line[0];
      const name = line[1];
      if (name) {
        const temQuery = `INSERT INTO TEMCARGO (id_cargo, cargo) VALUES ('${id}','${name}');`;
        listTemQueries.push(temQuery);
      }
    }
    finalQuery = `INSERT INTO CARGO (id_cargo, cargo) SELECT id_cargo, cargo FROM TEMCARGO;`;
    await this.database.loadDataDB(listTemQueries, finalQuery);
    console.log('Cargos loaded');


    listTemQueries = [];
    const dataPartidos = fs.readFileSync(partidosFilePath, 'utf8');
    lines = dataPartidos.split("\n").map(line => line.trim());
    for(let i = 1; i < lines.length; i++){
      const line = lines[i].split(",");
      const id = line[0];
      const name = line[1];
      const siglas = line[2];
      let fundacion = line[3];

      // convert date to yyyy-mm-dd
      if (fundacion) {
        const date = fundacion.split("/");
        fundacion = `${date[2]}-${date[1]}-${date[0]}`;
      }

      if (name && siglas && fundacion) {
        const temQuery = `INSERT INTO TEMPARTIDO (id_partido,nombre_partido, siglas, fundacion) 
        VALUES (${id},'${name}','${siglas}','${fundacion}');`;
        listTemQueries.push(temQuery);
      }
    }
    finalQuery = `INSERT INTO PARTIDO (id_partido, nombre_partido, siglas, fundacion) SELECT id_partido, nombre_partido, siglas, fundacion FROM TEMPARTIDO;`;
    await this.database.loadDataDB(listTemQueries, finalQuery);
    console.log('Partidos loaded');
    

    listTemQueries = [];
    const dataCandidatos = fs.readFileSync(candidatosFilePath, 'utf8');
    lines = dataCandidatos.split("\n").map(line => line.trim());
    for(let i = 1; i < lines.length; i++){
      const line = lines[i].split(",");
      const id = line[0];
      const names = line[1].replace("'", '"');
      let birth = line[2];
      const id_partido = line[3];
      const id_cargo = line[4];

      // convert date to yyyy-mm-dd
      if (birth) {
        const date = birth.split("/");
        birth = `${date[2]}-${date[1]}-${date[0]}`;
      }

      if (id && names && birth && id_partido && id_cargo) {
        const temQuery = `INSERT INTO TEMCANDIDATO (id_candidato, nombres, fecha_nacimiento, id_partido, id_cargo) VALUES (${id},'${names}','${birth}',${id_partido},${id_cargo});`;
        listTemQueries.push(temQuery);
      }
    }
    finalQuery = `INSERT INTO CANDIDATO (id_candidato, nombres, fecha_nacimiento, id_partido, id_cargo) SELECT id_candidato, nombres, fecha_nacimiento, id_partido, id_cargo FROM TEMCANDIDATO;`;
    await this.database.loadDataDB(listTemQueries, finalQuery);
    console.log('Candidatos loaded');


    listTemQueries = [];
    const dataCiudadanos = fs.readFileSync(ciudadanosFilePath, 'utf8');
    lines = dataCiudadanos.split("\n").map(line => line.trim());
    for(let i = 1; i < lines.length; i++){
      const line = lines[i].split(",");
      const dpi = line[0];
      const name = String(line[1]).replace("'", '"');
      const lastname = String(line[2]).replace("'", '"');
      const address = line[3]
      const phone = line[4];
      const age = line[5];
      const gender = line[6];

      if (dpi && name && lastname && address && phone && age && gender) {
        const temQuery = `INSERT INTO TEMCIUDADANO(dpi, nombre, apellido, direccion, telefono,edad, genero) VALUES ('${dpi}','${name}','${lastname}','${address}','${phone}',${age},'${gender}') `;
        listTemQueries.push(temQuery);
      }

    }
    finalQuery = `INSERT INTO CIUDADANO(dpi, nombre, apellido, direccion, telefono,edad, genero) SELECT dpi, nombre, apellido, direccion, telefono,edad, genero FROM TEMCIUDADANO;`;
    await this.database.loadDataDB(listTemQueries, finalQuery); 
    console.log('Ciudadanos loaded');


    listTemQueries = [];
    const dataMesas = fs.readFileSync(mesasFilePath, 'utf8');
    lines = dataMesas.split("\n").map(line => line.trim());
    for(let i = 1; i < lines.length; i++){
      const line = lines[i].split(",");
      const id = line[0];
      const id_departamento = line[1];

      if (id && id_departamento) {
        const temQuery = `INSERT INTO TEMMESA(id_mesa, id_departamento) VALUES (${id},${id_departamento}) `;
        listTemQueries.push(temQuery);
      }

    }
    finalQuery = `INSERT INTO MESA(id_mesa, id_departamento) SELECT id_mesa, id_departamento FROM TEMMESA;`;
    await this.database.loadDataDB(listTemQueries, finalQuery);
    console.log('Mesas loaded');


    listTemQueries = [];
    const dataVotos = fs.readFileSync(votosFilePath, 'utf8');
    lines = dataVotos.split("\n").map(line => line.trim());
    for(let i = 1; i < lines.length; i++){
      const line = lines[i].split(",");
      const id = line[0];
      const dpi = line[1];
      const id_mesa = line[2];
      let datetime = line[3];

      // convert date to yyyy-mm-dd HH:mm:ss
      if (datetime) {
        const date = datetime.split("/");
        const time = date[2].split(" ");
        datetime = `${time[0]}-${date[1]}-${date[0]} ${time[1]}:00`;
      }

      if (id && datetime && dpi && id_mesa) {
        const temQuery = `INSERT INTO TEMVOTO(id_voto, datetime, dpi, id_mesa) VALUES (${id},'${datetime}','${dpi}',${id_mesa}) `;
        listTemQueries.push(temQuery);
      }
    }
    finalQuery = `INSERT INTO VOTO(id_voto, datetime, dpi, id_mesa) SELECT id_voto, datetime, dpi, id_mesa FROM TEMVOTO;`;
    await this.database.loadDataDB(listTemQueries, finalQuery);
    console.log('Votos loaded');


    listTemQueries = [];
    const dataDetalleVotos = fs.readFileSync(detalle_votosFilePath, 'utf8');
    lines = dataDetalleVotos.split("\n").map(line => line.trim());
    for(let i = 1; i < lines.length; i++){
      const line = lines[i].split(",");
      const id_voto = line[0];
      const id_candidato = line[1];

      if (id_voto && id_candidato) {
        const temQuery = `INSERT INTO TEMDETALLE_VOTO(id_voto, id_candidato) VALUES (${id_voto},${id_candidato}) `;
        listTemQueries.push(temQuery);
      }
    }
    finalQuery = `INSERT INTO DETALLE_VOTO(id_voto, id_candidato) SELECT id_voto, id_candidato FROM TEMDETALLE_VOTO;`;
    await this.database.loadDataDB(listTemQueries, finalQuery);
    console.log('Detalle Votos loaded');

    await this.deleteTables(deleteScript);

    return 'data added to temp tables';
  }

  async query1(){
    
    return this.database.queries(`
    SELECT CP.nombres as presidente,
           CV.nombres as vicepresidente,
           P1.nombre_partido as partido
    FROM CANDIDATO CP -- tabla candidato
    JOIN PARTIDO P1 ON CP.id_partido = P1.id_partido
    JOIN CARGO CP_cargo ON CP.id_cargo = CP_cargo.id_cargo
    JOIN CANDIDATO CV ON CV.id_partido = P1.id_partido
    JOIN CARGO CV_cargo ON CV.id_cargo = CV_cargo.id_cargo
    WHERE CP_cargo.cargo = 'presidente' AND CV_cargo.cargo = 'vicepresidente';
    `);
  }

  async query2(){
    return this.database.queries(`
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
    `);
  }

  async query3(){
    return this.database.queries(`
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
    `);
  }

  async query4(){
    return this.database.queries(`
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
    `);
  }

  async query5(){
    return this.database.queries(`
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
    `);
  }

  async query6(){
    return this.database.queries(`
    SELECT
      COUNT(*) AS 'Votos nulos'
    FROM
        DETALLE_VOTO DV
    WHERE
        DV.id_candidato = -1;
    `);
  }
  
  async query7(){
    return this.database.queries(`
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
    `);
  }

  async query8(){
    return this.database.queries(`
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
    `);
  }

  async query9(){
    return this.database.queries(`
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
    `);
  }

  async query10(){
    return this.database.queries(`
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
    `);
  }

  async query11(){
    return this.database.queries(`
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
    `);
  }
}