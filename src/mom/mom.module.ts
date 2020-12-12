import { Module } from "@nestjs/common"
import { MomController } from "./mom.controller"
import { MomService } from './mom.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { Mom, Child } from "./mom.model"

@Module({
    imports: [TypeOrmModule.forFeature([Mom, Child])],
    controllers: [MomController],
    providers: [TypeOrmModule, MomService],
})
export class MomModule { }