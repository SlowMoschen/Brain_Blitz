import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional } from "class-validator";

export class UpdateUserStatisticsDTO {

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    login_count: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    login_streak: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    max_login_streak: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    completed_quizzes: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    correct_answers: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    incorrect_answers: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    points: number;
}