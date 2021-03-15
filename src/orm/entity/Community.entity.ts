import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, Column } from "typeorm";
import { PostEntity } from "./Post.entity";
import { JobEntity } from "./Job.entity";
import { MaxLength } from "class-validator";

@ObjectType("Community")
@Entity({name: "communities"})
export class CommunityEntity extends BaseEntity{

    @Field()
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Field({nullable: true})
    @CreateDateColumn({name: 'created', type: "timestamp with time zone"})
    created?: Date;

    @Field(() => String)
    @Column()
    @MaxLength(20)
    name: string;

    @Field()
    @Column()
    @MaxLength(200)
    description: string;

    @Field(() => [PostEntity], {nullable: true})
    @OneToMany(() => PostEntity, post => post.community)
    posts: PostEntity[];

    @Field(() => [JobEntity], {nullable: true})
    @OneToMany(() => JobEntity, job => job.community)
    jobs: JobEntity[];
}