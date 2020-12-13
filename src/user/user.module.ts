import { Module, forwardRef } from "@nestjs/common"
import { UserController } from "./user.controller"
import { UserService } from './user.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { User } from "./user.model"
import { AuthService } from "src/auth/auth.service";
import { AuthModule } from "src/auth/auth.module";
import { JwtService, JwtModule } from "@nestjs/jwt";
import { SitterService } from "src/sitter/sitter.service";
import { SitterModule } from "src/sitter/sitter.module";
import { MomModule } from "src/mom/mom.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
        forwardRef(() => SitterModule),
        forwardRef(() => MomModule)
    ],
    controllers: [UserController],
    providers: [TypeOrmModule, UserService],
    exports: [UserService]
})
export class UserModule { }