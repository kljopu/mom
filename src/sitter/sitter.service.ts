import { Injectable, Dependencies, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sitter } from './sitter.model';
import { Repository, Not } from 'typeorm';
import { User } from 'src/user/user.model';
import { Mom } from 'src/mom/mom.model';
import { RegisterOutputDTO } from "./dtos/sitter.output.dto"
import { DefaultDTO } from 'src/shared/utill/default.dto';
import { RegisterInputDTO } from './dtos/sitter.input.dto';

@Injectable()
export class SitterService {
    constructor(
        @InjectRepository(Sitter)
        private readonly sitters: Repository<Sitter>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(Mom)
        private readonly moms: Repository<Mom>
    ) { }
    async role(role: string, user): Promise<DefaultDTO> {
        try {
            user.role = role
            await this.users.save(user)
            const sitter = await this.sitters.save(
                this.sitters.create({
                    user
                })
            )
            return {
                ok: true
            }
        } catch (error) {
            return error.response
        }
    }

    async register(input: RegisterInputDTO, user): Promise<RegisterOutputDTO> {
        try {
            if (!user.role || user.role !== "Sitter") {
                throw new BadRequestException('Enroll First')
            }
            const sitter = await this.sitters.findOne({ user })
            sitter.aboutMe = input.aboutMe
            sitter.ableSittingAgeFrom = input.ableSittingAgeFrom
            sitter.ableSittingAgeTo = input.ableSittingAgeTo
            this.sitters.save(sitter)
            return {
                ok: true,
                sitter: sitter
            }
        } catch (error) {
            return error.response
        }
    }

    async updateProfile(input: RegisterInputDTO, user): Promise<RegisterOutputDTO> {
        try {
            const {
                aboutMe,
                ableSittingAgeFrom,
                ableSittingAgeTo
            } = input
            if (!user.role || user.role !== "Sitter") {
                throw new BadRequestException("Enroll First")
            }
            const sitter: Sitter = await this.sitters.findOne({ user })
            sitter.aboutMe = aboutMe
            sitter.ableSittingAgeFrom = ableSittingAgeFrom
            sitter.ableSittingAgeTo = ableSittingAgeTo
            await sitter.save()
            return {
                ok: true,
                sitter
            }
        } catch (error) {
            return error.response
        }
    }
}
