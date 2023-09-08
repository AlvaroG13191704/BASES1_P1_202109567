import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(
    private readonly dataSource: DataSource
  ){}

  // createTablesDB will read the script from the file and execute it
  async createTablesDB( listTables: string[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
  

    try {
      // create a table
      for (const table of listTables) {
        if (table) {
          await queryRunner.query(table);
        }
      }
      await queryRunner.commitTransaction();  
      console.log('Tables created');
      return 'Tables created';

    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      return error;

    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  // deleteTablesDB will read the script from the file and execute it
  async deleteTablesDB( listTables: string[]) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
  

    try {
      // create a table
      for (const table of listTables) {
        if (table) {
          await queryRunner.query(table);
        }
      }
      await queryRunner.commitTransaction();  
      console.log('Tables deleted');
      return 'Tables deleted';

    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      return error;

    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  // loadData -> load the data first, in the temp tables then pass it to the final tables
  async loadDataDB( listQueries: string[], finalQuery: string ) {
    
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // create a table
      for (const query of listQueries) {
        if (query) {
          await queryRunner.query(query);
        }
      }
      await queryRunner.query(finalQuery);
      await queryRunner.commitTransaction();  
      console.log('Data loaded');
      return 'Data loaded';
    }catch(error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      console.log(error);
      return error;

    }finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
    
  }

  
  async queries( query: string ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const result = await queryRunner.query(query);
      await queryRunner.commitTransaction();  
      console.log('Query 1');
      return result;

    } catch (error) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      console.log(error);
      return error;

    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
