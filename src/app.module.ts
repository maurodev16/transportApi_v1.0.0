import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as options from './db/config/ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CarsModule } from './modules/cars/cars.module';

@Module({
  imports: [TypeOrmModule.forRoot(options), AuthModule, CarsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
