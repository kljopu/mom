import {
    Column,
    Entity,
    OneToMany,
    ManyToOne,
    OneToOne,
    JoinColumn,
    RelationId
} from 'typeorm';
import { BaseModel } from '../shared/base.model';
import { Gender } from "../shared/utill/gender"
import { User } from "../user/user.model"

@Entity()
export class Sitter extends BaseModel {
    @Column({ type: "text", nullable: false })
    aboutMe!: string;

    @Column({ type: "int", default: 0 })
    ableSittingAgeFrom: number;

    @Column({ type: "int", default: 0 })
    ableSittingAgeTo: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user!: User

    @Column()
    userId: number;
}