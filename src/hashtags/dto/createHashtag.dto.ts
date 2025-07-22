import { Field, InputType } from "@nestjs/graphql";
import { IsString, Matches} from "class-validator";

@InputType()
export class HashtagDto{
    @Field()
    @IsString()
    title:string
}