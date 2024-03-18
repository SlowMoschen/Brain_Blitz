import { IsArray, IsJSON, IsNotEmpty, IsObject, IsString } from "class-validator";
import { CreateQuestionDTO } from "./create-question.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateQuizDTO {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly category: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsArray()
    @IsObject({ each: true })
    questions: CreateQuestionDTO[];
}