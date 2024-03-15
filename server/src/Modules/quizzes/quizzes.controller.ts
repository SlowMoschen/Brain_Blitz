import { Controller } from "@nestjs/common";

@Controller("quizzes")
export class QuizzesController {
    constructor() {
        console.log("QuizzesController constructor");
    }
}