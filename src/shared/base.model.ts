import {
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

export abstract class BaseModel {
    @PrimaryGeneratedColumn('increment')
    id!: number

    @CreateDateColumn()
    @Column({ type: "timestamp" })
    createAt!: Date

    @UpdateDateColumn()
    @Column({ type: "timestamp" })
    updateAt!: Date

    @DeleteDateColumn()
    @Column({ type: "timestamp" })
    deletedAt!: Date
}