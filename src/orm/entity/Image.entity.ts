import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, VersionColumn, ManyToOne, Column } from "typeorm";
import { UserEntity } from "./User.entity";

@ObjectType("Image")
@Entity({name: "image"})
export class ImageEntity extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Field({description: "The date at which image was created."})
    @CreateDateColumn({name: "created", type: "timestamp with time zone"})
    created: Date;

    @UpdateDateColumn({name: "updated", type: "timestamp with time zone"})
    updated: Date;

    @VersionColumn({name: "version", default: 1})
    version: number;

    @ManyToOne(() => UserEntity, {nullable: true})
    user: UserEntity;

    // posts many to one

    // game many to one

    // project many to one

    @Field({description: "The uri at which this asset exists on the internet."})
    @Column()
    uri: string;

    @Field({description: "The width of the image asset."})
    @Column()
    width: number;

    @Field({description: "The height of the image asset."})
    @Column()
    height: number;

    @Column()
    name: string;

    @Column()
    bucket: string;

    
}