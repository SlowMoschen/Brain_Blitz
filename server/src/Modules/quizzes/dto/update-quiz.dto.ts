import { IsArray, IsObject, IsOptional, IsString } from "class-validator";
import { CreateQuestionDTO } from "./create-question.dto";

export class UpdateQuizDTO {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    category: string;

    @IsOptional()
    @IsArray()
    @IsObject({ each: true })
    questions: CreateQuestionDTO[];
}