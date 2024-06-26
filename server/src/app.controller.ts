import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Roles } from './Decorators/roles.decorator';
import { User } from './Decorators/user.decorator';
import { Role } from './Enums/role.enum';
import { SendReportFormEvent } from './Events/notification.events';
import { AuthenticationGuard } from './Guards/auth.guard';
import { RolesGuard } from './Guards/roles.guard';
import { QuizService } from './Modules/quizzes/quizzes.service';
import { UsersService } from './Modules/users/users.service';
import { ContactDTO, ReportDTO } from './app.dto';

@ApiTags('App')
@SkipThrottle()
@Controller()
export class AppController {
	constructor(
		private readonly quizService: QuizService,
		private readonly userService: UsersService,
		private readonly eventEmitter: EventEmitter2,
	) {}

	@Get('health')
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

	@UseGuards(AuthenticationGuard, RolesGuard)
	@Roles(Role.ADMIN, Role.USER)
	@UsePipes(new ValidationPipe())
	@Post('report')
	async sendReport(@Body() reportDTO: ReportDTO, @User('id') id: string) {
		const user = await this.userService.getUserByID(id);
		this.eventEmitter.emit('mail.report-form', new SendReportFormEvent(reportDTO.problem, reportDTO.description, user, reportDTO.id));
		return 'Report submitted!';
	}
}
