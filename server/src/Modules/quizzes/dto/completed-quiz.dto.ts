import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CompletedQuizDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	correct_answers: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	incorrect_answers: number;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	score: number;
}
