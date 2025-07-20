import { Field, InputType } from "@nestjs/graphql";
import {  IsInt } from "class-validator";

@InputType()
export class followerDto{
    @Field()
    @IsInt()
    leader_id:number

    @Field()
    @IsInt()
    follower_id:number
    
}