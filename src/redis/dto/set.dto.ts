import { Field, InputType } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class setRedisDto{
    @Field()
    @IsString()
    key:string

    @Field()
    value:string

}