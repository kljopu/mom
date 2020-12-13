import { Controller, Req, Res, Post, HttpStatus, Body } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CreateUserInputDTO, LoginInputDTO, CreateUserOutputDTO } from "./dtos/auth.dto"

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Post('/signUp')
    async signUp(@Body('input') input: CreateUserInputDTO, @Res() res: Response): Promise<Response> {
        const result: CreateUserOutputDTO = await this.userService.createUser(input)
        return res.status(HttpStatus.OK).json({ result })
    }

    @Post('/login')
    async login(@Body('input') input: LoginInputDTO, @Res() res): Promise<Response> {
        const result = await this.authService.login(input)
        return res.status(HttpStatus.OK).json({ result })
    }
}
