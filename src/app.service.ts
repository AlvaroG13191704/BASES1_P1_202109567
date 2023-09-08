import { Injectable } from '@nestjs/common';
import path = require('path');
const fs = require('fs');
import { DatabaseService } from './database/database.service';
const departamentosFilePath = path.join(__dirname,  '../src/files/departamentos.csv');
const cargosFilePath = path.join(__dirname,  '../src/files/cargos.csv');
const partidosFilePath = path.join(__dirname,  '../src/files/partidos.csv');

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
        const temQuery = `INSERT INTO TEMPARTIDO (id_partido,nombre_partido, siglas, fundacion) VALUES ('${id}','${name}','${siglas}','${fundacion}');`;
        listTemQueries.push(temQuery);
      }
    }
    finalQuery = `INSERT INTO PARTIDO (id_partido, nombre_partido, siglas, fundacion) SELECT id_partido, nombre_partido, siglas, fundacion FROM TEMPARTIDO;`;
    await this.database.loadDataDB(listTemQueries, finalQuery);
    console.log('Partidos loaded');
    

    await this.deleteTables(deleteScript);

    return 'data added to temp tables';
  }
  
}