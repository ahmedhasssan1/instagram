import { Field, Float, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import {  number } from "zod";

@InputType()
export class PhotoTagsDto{
    @Field()
    @IsNumber()
    postId:number

    @Field()
    @IsNumber()
    userId:number

    @Field(()=>Float)
    x:number

    @Field(()=>Float)
    y:number
}