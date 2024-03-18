import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionDTO {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    question: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    correct_answer: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    answers: string[];
}