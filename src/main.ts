import path from "path"
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config } from "dotenv"
import { resolve } from 'path';

config({ path: resolve(__dirname, `../.${process.env.NODE_ENV}.env`) });
console.log(process.env.NODE_ENV);

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
}
bootstrap();
