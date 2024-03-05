import { IsNumber, IsOptional } from "class-validator";

export class UpdateUserStatisticsDTO {
    @IsOptional()
    @IsNumber()
    login_count: number;

    @IsOptional()
    @IsNumber()
    login_streak: number;

    @IsOptional()
    @IsNumber()
    max_login_streak: number;

    @IsOptional()
    @IsNumber()
    completed_quizzes: number;

    @IsOptional()
    @IsNumber()
    correct_answers: number;

    @IsOptional()
    @IsNumber()
    incorrect_answers: number;

    @IsOptional()
    @IsNumber()
    points: number;
}