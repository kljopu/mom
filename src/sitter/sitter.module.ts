import { Module, forwardRef } from "@nestjs/common"
import { SitterController } from "./sitter.controller"
import { SitterService } from './sitter.service';
import { Sitter } from "./sitter.model"
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.model";
import { MomModule } from "src/mom/mom.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Sitter, User]),
        forwardRef(() => MomModule)
    ],
    controllers: [SitterController],
    providers: [TypeOrmModule, SitterService],
    exports: [SitterService, TypeOrmModule]
})
export class SitterModule { }