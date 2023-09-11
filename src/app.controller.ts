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

  @Get('/consulta3')
  query3() {
    return this.appService.query3();
  }

  @Get('/consulta4')
  query4() {
    return this.appService.query4();
  }

  @Get('/consulta5')
  query5() {
    return this.appService.query5();
  }

  @Get('/consulta6')
  query6() {
    return this.appService.query6();
  }

  @Get('/consulta7')
  query7() {
    return this.appService.query7();
  }

  @Get('/consulta8')
  query8() {
    return this.appService.query8();
  }

  @Get('/consulta9')
  query9() {
    return this.appService.query9();
  }

  @Get('/consulta10')
  query10() {
    return this.appService.query10();
  }

  @Get('/consulta11')
  query11() {
    return this.appService.query11();
  }
}
