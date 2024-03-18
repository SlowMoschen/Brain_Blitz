import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CompletedQuizDTO {
    @IsNotEmpty()
    @IsString()
    correct_answers: string;

    @IsNotEmpty()
    @IsString()
    incorrect_answers: string;

    @IsNotEmpty()
    @IsInt()
    score: number;
}
