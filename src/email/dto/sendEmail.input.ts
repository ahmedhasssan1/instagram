import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, isEmail, IsOptional, IsString, isString } from "class-validator";

@InputType()
export class Sendemaildto{

    @Field()
    @IsEmail()
    email:string

    @Field()
    name:string

    @Field()
    otp:string


}