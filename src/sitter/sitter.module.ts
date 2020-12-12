import { Module } from "@nestjs/common"
import { SitterController } from "./sitter.controller"
import { SitterService } from './sitter.service';
import { Sitter } from "./sitter.model"
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Sitter])],
    controllers: [SitterController],
    providers: [TypeOrmModule, SitterService],
})
export class SitterModule { }