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
import { Mom } from 'src/mom/mom.model';

@Entity()
export class Sitter extends BaseModel {
    @Column({ type: "text", nullable: true })
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

    @ManyToOne(() => Mom, mom => mom.sitters, { onDelete: "CASCADE" })
    mom: Mom;

    @RelationId((sitter: Sitter) => sitter.mom)
    momId: number;
}