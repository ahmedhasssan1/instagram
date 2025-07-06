import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class otpDto{
    @Field()
    email:string
}