import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHighscoreDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	user_id: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	quiz_id: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	score: number;
}
