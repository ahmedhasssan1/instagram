import { Field, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType()
export class Pageination{
    @Field()
    @IsNumber()
    page:number

    @Field()
    @IsNumber()
    limit:number


}