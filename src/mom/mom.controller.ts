import {
    Controller,
    BadRequestException,
    InternalServerErrorException,
    UseGuards,
    Post,
    Req,
    Res,
    HttpStatus,
    Put,
    Get
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request, Response } from 'express';
import { MomService } from './mom.service';

@Controller('mom')
export class MomController {
    constructor(
        private readonly momService: MomService
    ) { }
    @UseGuards(JwtAuthGuard)
    @Post('register')
    async regiser(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const input = req.body.input
            const result = await this.momService.regiser(input, req.user)
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    async updateProfile(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const input = req.body.input
            const result = await this.momService.updateProfile(input, req.user)
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('possibleSitter')
    async getPossibleSitter(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const result = await this.momService.getPossibleSitting(req.user)
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }

    @UseGuards(JwtAuthGuard)
    @Put('requestSitting')
    async requestSitting(@Req() req: Request, @Res() res: Response): Promise<any> {
        try {
            const sitterId = req.body.input.sitterId
            const result = await this.momService.requestSitting(sitterId, req.user)
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}
