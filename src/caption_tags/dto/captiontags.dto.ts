import { Field, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";
import { Entity } from "typeorm";

@InputType()
@Entity()
export class CaptionTagsDto{
    @Field()
    @IsNumber()
    postID:number

    @Field()
    @IsNumber()
    userID:number
}