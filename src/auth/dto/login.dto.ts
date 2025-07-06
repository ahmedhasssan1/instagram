import { Field, InputType } from "@nestjs/graphql";
import { IsString, isString } from "class-validator";

@InputType()
export class LoginDto{
    @Field()
    @IsString()
    email:string

    @Field()
    @IsString()
    password:string
}