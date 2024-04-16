import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateHighscoreDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsNumber()
	score: number;
}
