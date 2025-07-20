import { Field, InputType } from "@nestjs/graphql";
import { file } from "zod";

@InputType()
export class Countfollowers{
    @Field()
    data:[]

    @Field()
    number:number
}