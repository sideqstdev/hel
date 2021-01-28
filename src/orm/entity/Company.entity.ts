import { ObjectType, Field } from "type-graphql";
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Index, ManyToOne, AfterLoad, OneToMany } from "typeorm";
import { UserEntity } from "./User.entity";
import { CompanySize } from "../../types/enums/CompanySize.enum";
import { JobEntity } from "./Job.entity";

@ObjectType("Company")
@Entity({name: "company"})
export class CompanyEntity extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Index()
    @Field()
    @Column({unique: true})
    name: string;

    @Index()
    @Field(() => UserEntity, {nullable: true})
    @ManyToOne(() => UserEntity, owner => owner.companies, {onDelete: "CASCADE"})
    owner: UserEntity;

    // may want to revisit sector as an array of strings
    @Field()
    @Column()
    sector: string;

    @Field()
    @Column()
    location: string;

    @Field()
    @Column()
    employeeCount: number;

    @Field(() => CompanySize, {nullable: true})
    @Column({nullable: true})
    companySize: CompanySize;
    
    @AfterLoad()
    async calcCompanySize(){
        switch(true){
            case(this.employeeCount <= 10):
                this.companySize = CompanySize.MICRO;
            case(this.employeeCount > 10 && this.employeeCount <=50):
                this.companySize = CompanySize.SMALL;
            case(this.employeeCount > 50 && this.employeeCount <= 100):
                this.companySize = CompanySize.MEDIUM_LOW;
            case(this.employeeCount > 100 && this.employeeCount <= 250):
                this.companySize = CompanySize.MEDIUM_HIGH;
            case(this.employeeCount > 250 && this.employeeCount <= 500):
                this.companySize = CompanySize.LARGE_LOW;
            case(this.employeeCount > 500 && this.employeeCount <= 1000):
                this.companySize = CompanySize.LARGE_HIGH;
            case(this.employeeCount > 1000):
                this.companySize = CompanySize.ENTERPRISE;
            default:
                this.companySize = CompanySize.NONE;
        }
    }

    @Field({nullable: true})
    @Column({nullable: true})
    twitter?: string;

    @Field({nullable: true})
    @Column({nullable: true})
    linkedin?: string;

    @Field({nullable: true})
    @Column({nullable: true})
    website: string;

    @Field(() => [JobEntity])
    @OneToMany(() => JobEntity, job => job.company)
    jobs: JobEntity[]


}