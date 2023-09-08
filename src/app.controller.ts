import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createTablesScript, createTempTablesScript, deleteTablesScript, deleteTempTablesScript } from './scripts/script';

@Controller()
export class AppController {

  private readonly createScript = createTablesScript
  private readonly deleteScript = deleteTablesScript
  private readonly createTempScript =  createTempTablesScript
  private readonly deleteTempScript =  deleteTempTablesScript


  constructor(private readonly appService: AppService) {}


  @Get('/crearmodelo')
  createTables() {
    this.appService.createTables(this.createScript);

    return 'Tables created';
  }

  @Get('/eliminarmodelo')
  deleteTables() {
    this.appService.deleteTables(this.deleteScript);

    return 'Tables deleted';
  }

  @Get('/cargartabtemp')
  chargeTemp() {
    this.appService.chargeTemp(this.createTempScript, this.deleteTempScript);

    return 'data added to temp tables';
  }

  @Get('/consulta1')
  query1() {
    return this.appService.query1();
  }

  @Get('/consulta2')
  query2() {
    return this.appService.query2();
  }
}
