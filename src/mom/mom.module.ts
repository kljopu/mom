import { Module, forwardRef } from "@nestjs/common"
import { MomController } from "./mom.controller"
import { MomService } from './mom.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Mom, Child } from "./mom.model"
import { User } from "src/user/user.model";
import { SitterModule } from "src/sitter/sitter.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Mom, Child, User]),
        forwardRef(() => SitterModule)
    ],
    controllers: [MomController],
    providers: [TypeOrmModule, MomService],
    exports: [MomService, TypeOrmModule]
})
export class MomModule { }