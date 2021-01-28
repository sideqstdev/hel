import { ObjectType, Field } from 'type-graphql'
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, VersionColumn, OneToOne, Index, OneToMany } from 'typeorm';
import { MaxLength } from 'class-validator';
import { ImageEntity } from './Image.entity';
import { CompanyEntity } from './Company.entity';
import { JobEntity } from './Job.entity';
import { PostEntity } from './Post.entity';
import { ApplicationEntity } from './Application.entity';

@ObjectType("User")
@Entity({name: "users"})
export class UserEntity extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    // date metadata
    @Field()
    @CreateDateColumn({name: "created", type: "timestamp with time zone"})
    created: Date;

    @Field()
    @CreateDateColumn({name: "updated", type: "timestamp with time zone"})
    updated: Date;

    @Field()
    @Column({name: "lastLogin" ,type: "timestamp with time zone", nullable: true})
    lastLogin: Date;

    @Field()
    @VersionColumn({name: "version", default: 1})
    version: number;
    
    @Field({defaultValue: false})
    @Column({default: false})
    verified: boolean;

    @Field({defaultValue: false})
    @Column({default: false})
    activated: boolean;

    @Field()
    @Column({nullable: true})
    firstName: string;

    @Field()
    @Column({nullable: true})
    lastName: string;

    @Index()
    @Field()
    @Column()
    username: string;

    @Field()
    @Column()
    email: string;

    @Column()
    password: string;

    @Field()
    @Column({nullable: true})
    dob: Date;

    @Field()
    @Column({default: "No bio"})
    @MaxLength(180)
    bio: string;

    @Field({nullable: true})
    @OneToOne(() => ImageEntity, {nullable: true, eager: true})
    avatar: ImageEntity;

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
    @Field(() => [CompanyEntity])
    @OneToMany(() => CompanyEntity, company => company.owner)
    companies: CompanyEntity[];

    // job related
    @Field(() => [JobEntity])
    @OneToMany(() => JobEntity, job => job.user)
    jobs: JobEntity[];

    @Field(() => [JobEntity])
    @OneToMany(() => JobEntity, job => job.saved)
    saved: JobEntity[];

    @Field(() => [PostEntity])
    @OneToMany(() => PostEntity, post => post.user)
    posts: PostEntity[];

    @Field(() => [ApplicationEntity])
    @OneToMany(() => ApplicationEntity, application => application.user)
    applications: ApplicationEntity[];

}