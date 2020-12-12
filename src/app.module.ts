import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { MomController } from './mom/mom.controller';
import { SitterController } from './sitter/sitter.controller';
import { typeormConfig } from "./shared/utill/typeOrmConfig"
import { TypeOrmModule } from '@nestjs/typeorm';
import { MomModule } from "./mom/mom.module"
import { SitterModule } from "./sitter/sitter.module"
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    SitterModule,
    MomModule,
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      ...typeormConfig,
    }),
  ],
  controllers: [AppController, UserController, MomController, SitterController],
  providers: [AppService],
})
export class AppModule { }
