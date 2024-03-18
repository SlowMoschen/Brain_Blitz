import { IsArray, IsObject, IsOptional, IsString } from "class-validator";
import { CreateQuestionDTO } from "./create-question.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateQuizDTO {
    @ApiProperty()
    @IsOptional()
    @IsString()
    title?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    description?: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    category?: string;

    @ApiProperty()
    @IsOptional()
    @IsArray()
    @IsObject({ each: true })
    questions?: CreateQuestionDTO[];
}