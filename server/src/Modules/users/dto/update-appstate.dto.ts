import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateAppStateDTO {
    @ApiProperty()
    @IsOptional()
    @IsArray()
    unlocked_quizzes: string[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    completed_quizzes: string[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    unlocked_achievements: string[];

    @ApiProperty()
    @IsOptional()
    @IsArray()
    highscores: string[];
}