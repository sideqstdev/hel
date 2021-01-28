import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToOne } from "typeorm";
import { UserEntity } from "./User.entity";
import { JobEntity } from "./Job.entity";

@ObjectType("Application")
@Entity({name: "application"})
export class ApplicationEntity extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity, user => user.applications, {onDelete: "CASCADE"})
    user: UserEntity;

    @Field()
    @Column({default: ""})
    coverLetter: string;

    @Field({nullable: true})
    @CreateDateColumn({type: "timestamp with time zone"})
    dateStarted: Date;

    @Field({nullable: true})
    @Column({type: "timestamp with time zone", nullable: true})
    dateApplied: Date;

    @Field(() => JobEntity)
    @ManyToOne(() => JobEntity, job => job.applications, {onDelete: "CASCADE"})
    job: JobEntity;

    @Field()
    @Column({default: false})
    applied: boolean;
}