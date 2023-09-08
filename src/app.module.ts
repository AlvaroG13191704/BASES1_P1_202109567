import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST || '127.0.0.1',
      port: +process.env.PORT || 3306,
      username: process.env.USER || 'root',
      password: process.env.PASS || 'admin',
      database: process.env.DB || 'proyecto1',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService]
})
export class AppModule {}
