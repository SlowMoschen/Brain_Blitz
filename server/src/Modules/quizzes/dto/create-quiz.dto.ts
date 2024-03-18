import { IsArray, IsJSON, IsObject, IsString } from "class-validator";
import { CreateQuestionDTO } from "./create-question.dto";

export class CreateQuizDTO {
    
    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly category: string;

    @IsArray()
    @IsObject({ each: true })
    questions: CreateQuestionDTO[];
}