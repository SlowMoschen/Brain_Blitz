import { Injectable } from "@nestjs/common";

@Injectable()
export class HighscoresService {
    getHello(): string {
        return "Hello World!";
    }
}