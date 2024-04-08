import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { InsertQuizQuestion } from 'src/Utils/Types/model.types';

export class UpdateQuizDTO {
	@ApiProperty()
	@IsOptional()
	@IsString()
	title?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	description?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	category?: string;

	@ApiProperty()
	@IsOptional()
	@IsArray()
	@IsObject({ each: true })
	questions?: InsertQuizQuestion[];

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	times_played?: number;
}
