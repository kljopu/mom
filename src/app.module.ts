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
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from "@nestjs/config"
import { SitterService } from './sitter/sitter.service';
import { MomService } from './mom/mom.service';

@Module({
  imports: [
    UserModule,
    SitterModule,
    MomModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.dev.env' : '.test.env',
    }),
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      ...typeormConfig,
    }),
  ],
  controllers: [
    AppController,
    UserController,
    MomController,
    SitterController
  ],
  providers: [
    AppService,
    SitterService,
    MomService
  ],
})
export class AppModule { }
