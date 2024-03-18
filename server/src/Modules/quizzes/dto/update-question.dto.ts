import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateQuestionDTO {
    @IsOptional()
    @IsString()
    question: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    answers: string[];

    @IsOptional()
    @IsString()
    correct_answer: string;
}