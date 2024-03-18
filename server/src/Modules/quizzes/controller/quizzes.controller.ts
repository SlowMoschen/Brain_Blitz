import { Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/Decorators/roles.decorator';
import { User } from 'src/Decorators/user.decorator';
import { Role } from 'src/Enums/role.enum';
import { AuthenticationGuard } from 'src/Guards/auth.guard';
import { RolesGuard } from 'src/Guards/roles.guard';

@UseGuards(AuthenticationGuard, RolesGuard)
@Controller('quizzes')
export class QuizzesController {
	constructor() {}

	@Roles(Role.ADMIN)
	@Get()
	async getAllQuizzes() {
		return 'All Quizzes';
	}

	@Roles(Role.ADMIN)
	@Post()
	async createQuiz() {
		return 'Quiz created';
	}

	@Roles(Role.USER, Role.ADMIN)
	@Get(':id')
	async getQuiz() {
		return 'Get Quiz';
	}

	@Roles(Role.ADMIN)
	@Patch(':id')
	async updateQuiz() {
		return 'Update Quiz';
	}

	@Roles(Role.ADMIN)
	@Delete(':id')
	async deleteQuiz() {
		return 'Delete Quiz';
	}

	@Roles(Role.USER, Role.ADMIN)
	@Patch('complete/:id')
	async completeQuiz(@Param('id') quizId: string, @User('id') userId: string) {
        
		return 'Complete Quiz';
	}

	@Roles(Role.USER, Role.ADMIN)
	@Get(':category')
	async getQuizzesByCategory() {
		return 'Quizzes by category';
	}

	@Roles(Role.USER, Role.ADMIN)
	@Get(':category/:id')
	async getQuizByCategory() {
		return 'Quiz by category';
	}
}
