import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Index, ManyToOne, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { CompanyEntity } from "./Company.entity";
import { JobType } from "../../types/enums/JobType.enum";
import { Experience } from "../../types/enums/ExperienceEnum.enum";
import { UserEntity } from "./User.entity";
import { ApplicationEntity } from "./Application.entity";

@ObjectType("Job")
@Entity({name: "job"})
export class JobEntity extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id: string;

    @ManyToOne(() => UserEntity, user => user.jobs)
    user: UserEntity;

    @ManyToOne(() => UserEntity, user => user.saved)
    saved: UserEntity;

    @Index()
    @Field(() => CompanyEntity, {nullable: true})
    @ManyToOne(() => CompanyEntity, company => company.jobs, {eager: true})
    company: CompanyEntity;

    @Field()
    @Column()
    title: string;

    @Field()
    @Column()
    description: string;

    @Field()
    @Column()
    location: string;

    @Field({nullable: true})
    @CreateDateColumn({type: "timestamp with time zone"})
    posted: Date;

    @Field({nullable: true})
    @UpdateDateColumn({type: "timestamp with time zone"})
    updated: Date;

    @Field(() => JobType)
    @Column()
    type: JobType;

    @Field(() => Experience)
    @Column()
    experience: Experience;

    @Field({nullable: true})
    @Column({nullable: true})
    salaryFloor: number;

    @Field({nullable: true})
    @Column({nullable: true})
    salaryCeiling: number;

    @Field({nullable: true})
    @Column({nullable: true})
    currency: string;

    @Field()
    @Column({default: false})
    offSiteApp: boolean;

    @Field()
    @Column({nullable: true})
    offSiteLink: string;

    @Field({nullable: true})
    @Column({default: 0})
    applicants: number;

    // applications
    @Field(() => [ApplicationEntity])
    @OneToMany(() => ApplicationEntity, application => application.job)
    applications: ApplicationEntity[];

}