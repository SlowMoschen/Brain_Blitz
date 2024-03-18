import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

@Injectable()
export class GameService {
    constructor() {}

    @OnEvent('quiz.completed')
    handleQuizCompletedEvent(payload: any) {
        console.log('Quiz completed', payload);
    }
}