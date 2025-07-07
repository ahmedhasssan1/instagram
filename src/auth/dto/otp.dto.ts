import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional } from "class-validator";

@InputType()
export class otpDto{
    @Field()
    @IsEmail()
    email:string

    @Field()
    otp:string
}

@InputType()
export class resetPasswordDto extends otpDto{
    @Field()
    newPassword:string
}