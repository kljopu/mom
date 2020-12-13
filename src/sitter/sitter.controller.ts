import {
    Controller,
    InternalServerErrorException,
    UseGuards,
    Post,
    Req,
    Res,
    HttpStatus,
    Put,
    Get
} from '@nestjs/common';
import { SitterService } from './sitter.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response } from 'express';

@Controller('sitter')
export class SitterController {
    constructor(
        private readonly sitterService: SitterService
    ) { }

    @UseGuards(JwtAuthGuard)
    @Post('register')
    async regiser(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const input = req.body.input
            const result = await this.sitterService.register(input, req.user)
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    async updateProfile(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const input = req.body.input
            const result = await this.sitterService.updateProfile(input, req.user)
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
