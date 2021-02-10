import { ObjectType, Field } from 'type-graphql'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, VersionColumn, OneToOne, Index, OneToMany } from 'typeorm';
import { MaxLength } from 'class-validator';
import { ImageEntity } from './Image.entity';
import { CompanyEntity } from './Company.entity';
import { JobEntity } from './Job.entity';
import { PostEntity } from './Post.entity';
import { ApplicationEntity } from './Application.entity';
import { generateCode } from '../../util/auth/Encryption';

@ObjectType("User")
@Entity({name: "users"})
export class UserEntity extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    // date metadata
    @Field({nullable: true})
    @CreateDateColumn({name: "created", type: "timestamp with time zone"})
    created?: Date;

    @Field({nullable: true})
    @CreateDateColumn({name: "updated", type: "timestamp with time zone"})
    updated?: Date;

    @Field({nullable: true})
    @Column({name: "lastLogin" ,type: "timestamp with time zone", nullable: true})
    lastLogin?: Date;

    @Field({nullable: true})
    @Column({name: "version", default: 1})
    version?: number;
    
    @Field({defaultValue: false, nullable: true})
    @Column({default: false})
    verified?: boolean;

    // Email activation conditions

    @Field({defaultValue: false})
    @Column({default: false})
    activated?: boolean;

    @Field({nullable: true})
    @Column({unique: true, nullable: true })
    emailCode?: string;

    @Field({nullable: true})
    @Column({nullable: true})
    firstName?: string;

    @Field({nullable: true})
    @Column({nullable: true})
    lastName?: string;

    @Index()
    @Field()
    @Column()
    username: string;

    @Field()
    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Field({nullable: true})
    @Column({nullable: true})
    dob?: Date;

    @Field({nullable: true})
    @Column({default: "No bio"})
    @MaxLength(180)
    bio?: string;

    @Field({nullable: true})
    @Column({nullable: true})
    industry: string;

    @Field({nullable: true})
    @OneToOne(() => ImageEntity, image => image.user, {nullable: true, eager: true})
    avatar?: ImageEntity;

    // social media
    @Field({nullable: true})
    @Column({nullable: true})
    twitter?: string;

    @Field({nullable: true})
    @Column({nullable: true})
    linkedin?: string;

    @Field({nullable: true})
    @Column({nullable: true})
    website?: string;

    @Field(() => [String], {nullable: true})
    @Column("text",{array: true, nullable: true})
    links?: string[];

    // content
    @Field(() => [CompanyEntity], {nullable: true})
    @OneToMany(() => CompanyEntity, company => company.owner, {nullable: true})
    companies?: CompanyEntity[];

    // job related
    @Field(() => [JobEntity], {nullable: true})
    @OneToMany(() => JobEntity, job => job.user, {nullable: true})
    jobs?: JobEntity[];

    @Field(() => [JobEntity], {nullable: true})
    @OneToMany(() => JobEntity, job => job.saved, {nullable: true})
    saved?: JobEntity[];

    @Field(() => [PostEntity], {nullable: true})
    @OneToMany(() => PostEntity, post => post.user, {nullable: true})
    posts?: PostEntity[];

    @Field(() => [ApplicationEntity], {nullable: true})
    @OneToMany(() => ApplicationEntity, application => application.user, {nullable: true})
    applications?: ApplicationEntity[];

}