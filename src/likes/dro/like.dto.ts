import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNumber, IsString } from "class-validator";
import { nullable } from "zod";

@InputType()
export class LikeDto{

    @Field()
    @IsString()
    target:string

    @Field(()=>Int)
    @IsNumber()
    user_id:number

    @Field(()=>Int,{nullable:true})
    post_id:number

    @Field(()=>Int,{nullable:true})
    comment_id:number

}