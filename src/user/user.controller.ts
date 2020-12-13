import {
    Controller,
    Post,
    UseGuards,
    Req,
    Res,
    Put,
    Delete,
    HttpStatus,
    Body,
    BadRequestException,
    Get,
    InternalServerErrorException
} from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { SitterService } from 'src/sitter/sitter.service';
import { MomService } from 'src/mom/mom.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly sitterService: SitterService,
        private readonly momService: MomService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('register/role')
    async regiserRole(@Res() res: Response, @Req() req: Request): Promise<Response> {
        try {
            const { role } = req.body.input
            let result = {}
            if (role === "Mom") {
                result = await this.momService.role(role, req.user)
            } else if (role === "Sitter") {
                result = await this.sitterService.role(role, req.user)
            } else {
                throw new BadRequestException('Invalid Role')
            }
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Res() res: Response, @Req() req: Request): Promise<Response> {
        try {
            const result = await this.userService.getProfile(req.user)
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    async updateProfile(@Res() res: Response, @Req() req: Request): Promise<Response> {
        try {
            const input = req.body.input
            const result = await this.userService.updateBaseProfile(input, req.user)
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
