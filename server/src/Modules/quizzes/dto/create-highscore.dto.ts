import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHighscoreDTO {
	@IsNotEmpty()
	@IsString()
	user_id: string;

	@IsNotEmpty()
	@IsString()
	quiz_id: string;

	@IsNotEmpty()
	@IsNumber()
	score: number;
}
