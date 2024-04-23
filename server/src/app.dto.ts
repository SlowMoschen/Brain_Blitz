import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ContactDTO {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	name: string;

	@ApiProperty()
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	message: string;
}

export class ReportDTO {
	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	problem: string;

	@ApiProperty()
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	id?: string;
}
