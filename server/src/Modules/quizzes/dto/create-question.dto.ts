import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateQuestionDTO {

    @IsNotEmpty()
    @IsString()
    question: string;

    @IsNotEmpty()
    @IsString()
    correct_answer: string;

    @IsNotEmpty()
    @IsArray()
    @IsString({ each: true })
    answers: string[];
}