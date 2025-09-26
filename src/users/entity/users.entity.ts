import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Followers } from "src/followers/entity/followers";
import { CreateDateColumn, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { nullable } from "zod";

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

    @Column({type:'text',nullable:true})
    refreshToken:string |null

    @Field(()=>String)
    @Column() 
    status:string
    
}