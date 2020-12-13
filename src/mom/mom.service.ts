import {
    Injectable,
    InternalServerErrorException,
    BadRequestException,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Mom, Child } from './mom.model';
import { User } from 'src/user/user.model';
import { parse } from "../shared/utill/date.parser"
import { Sitter } from 'src/sitter/sitter.model';
import { ageParser } from 'src/shared/utill/age.parser';
import { DefaultDTO } from 'src/shared/utill/default.dto';
import { RegisterInputDTO } from './dtos/mom.input.dto';
import { RegisterOutputDTO, GetSitterOutputDTO } from './dtos/mom.output.dto';

@Injectable()
export class MomService {
    constructor(
        @InjectRepository(Mom)
        private readonly moms: Repository<Mom>,
        @InjectRepository(Child)
        private readonly children: Repository<Child>,
        @InjectRepository(User)
        private readonly users: Repository<User>,
        @InjectRepository(Sitter)
        private readonly sitters: Repository<Sitter>,
    ) { }
    async role(role: string, user): Promise<DefaultDTO> {
        try {
            user.role = role
            await this.users.save(user)
            const mom = await this.moms.save(
                this.moms.create({
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
    async regiser(input: RegisterInputDTO, user): Promise<RegisterOutputDTO> {
        try {
            if (!user.role || user.role !== "Mom") {
                throw new BadRequestException('Enroll First')
            }
            const mom: Mom = await this.moms.findOne({ user })
            mom.requestContents = input.requestContents
            this.moms.save(mom)
            const children = input.children
            children.forEach(async (element) => {
                const birthday = parse(element.birthday)
                const children = new Child()
                children.name = element.name
                children.gender = element.gender
                children.birthday = birthday
                children.mom = mom
                await this.children.save(children)
            });
            return {
                ok: true,
                mom: mom
            }
        } catch (error) {
            return error.response
        }
    }

    async updateProfile(input: RegisterInputDTO, user): Promise<DefaultDTO> {
        try {
            const { requestContents, children } = input
            var mom: Mom = await this.moms.findOne({ user }, { relations: ["children"], order: { id: "DESC" } })
            if (!mom) {
                throw new NotFoundException('Not Exitsts')
            }
            mom.requestContents = requestContents
            await children.forEach(async (element) => {
                const child: Child = await (await this.children.findOne({ id: element.id }))
                if (!child) {
                    throw new NotFoundException('Not Exitsts')
                }
                child.name = element.name
                const birthday = parse(element.birthday)
                child.birthday = birthday
                child.gender = element.gender
                await child.save()
            });
            await mom.save({ reload: true })
            return {
                ok: true,
            }
        } catch (error) {
            return error.response
        }
    }

    async getPossibleSitting(user): Promise<GetSitterOutputDTO> {
        try {
            if (user.role !== "Mom") {
                throw new BadRequestException("Enroll First")
            }
            const myChildren = await this.moms.findOne({
                where: { userId: user.id },
                relations: ["children"]
            })
            const ageRange = []
            for (var i of myChildren.children) {
                ageRange.push(ageParser(i.birthday));
            }
            ageRange.sort()
            const sitters = await this.sitters.find({
                where: {
                    userId: Not(user.id),
                    ableSittingAgeFrom: LessThanOrEqual(ageRange[0]),
                    ableSittingAgeTo: MoreThanOrEqual(ageRange[ageRange.length - 1])
                },
            })
            return {
                ok: true,
                sitters
            }
        } catch (error) {
            return error.response
        }
    }

    async requestSitting(sitterId: string, user): Promise<DefaultDTO> {
        try {
            if (user.role !== "Mom") {
                throw new BadRequestException("Enroll First")
            }
            const mom: Mom = await this.moms.findOne({ user })
            const sitter: Sitter = await this.sitters.findOne(sitterId)
            sitter.mom = mom
            sitter.save()
            return {
                ok: true
            }
        } catch (error) {
            return error.response
        }
    }
}

