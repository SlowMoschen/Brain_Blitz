import { Injectable } from "@nestjs/common";

@Injectable()
export class QuizzesService {
    getQuizzes(): string {
        return "Quizzes";
    }
}