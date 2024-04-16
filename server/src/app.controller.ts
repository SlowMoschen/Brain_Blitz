import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuizService } from './Modules/quizzes/quizzes.service';
import { SkipThrottle } from '@nestjs/throttler';
import { ContactDTO } from './contact.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@SkipThrottle()
@Controller()
export class AppController {
	constructor(
		private readonly quizService: QuizService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	@Get()
	healthCheck(): string {
		return 'Server is up and running!';
	}

	@Get('quiz-data')
	async getStats() {
		return await this.quizService.getStats();
	}

	@Post('contact')
	async sendContactForm(@Body() contactDTO: ContactDTO) {
		this.eventEmitter.emit('mail.contact-form', contactDTO);
		return 'Contact form submitted!';
	}
}
