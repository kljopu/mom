import {
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BaseEntity,
} from 'typeorm';

export abstract class BaseModel extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @CreateDateColumn()
    // @Column({ type: "timestamp" })
    createAt!: Date

    @UpdateDateColumn()
    // @Column({ type: "timestamp" })
    updateAt!: Date

    @DeleteDateColumn()
    // @Column({ type: "timestamp" })
    deletedAt!: Date
}