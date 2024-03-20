import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDTO {
	@ApiProperty()
	@IsOptional()
	@IsString()
	question?: string;

	@ApiProperty()
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	answers?: string[];

	@ApiProperty()
	@IsOptional()
	@IsString()
	correct_answer?: string;
}
