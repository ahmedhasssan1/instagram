import { Field, Int, ObjectType } from "@nestjs/graphql";
import { IsEmail, IsInt, IsString } from "class-validator";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
@ObjectType()
export class Users{

    @PrimaryGeneratedColumn()
    @Field(()=>Int)
    id:number

    @Field(()=>Date)
    @CreateDateColumn({type:'timestamp'})
    created_at:Date

    @Field(()=>Date)
    @CreateDateColumn({type:'timestamp'})
    updated_at:Date

    @Field(()=>String)
    @Column() 
    username:string

    @Field(()=>String)
    @Column() 
    bio:string

    @Field(()=>String)
    @Column() 
    number:string

    @Field(()=>String)
    @Column() 
    email:string

    @Field(()=>String)
    @Column() 
    password:string

    @Field(()=>String)
    @Column() 
    status:string
}