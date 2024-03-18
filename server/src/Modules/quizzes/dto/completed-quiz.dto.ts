import { IsNotEmpty, IsNumber } from "class-validator";

export class CompletedQuizDTO {
    @IsNotEmpty()
    @IsNumber()
    correct_answers: number;

    @IsNotEmpty()
    @IsNumber()
    incorrect_answers: number;

    @IsNotEmpty()
    @IsNumber()
    score: number;
}
