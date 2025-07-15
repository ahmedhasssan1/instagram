import { Field, InputType } from "@nestjs/graphql";
import { IsString, isString } from "class-validator";

@InputType()
export class BullMqDto{
    @Field()
    @IsString()
    email:string

    @Field()
    @IsString()
    username:string
}