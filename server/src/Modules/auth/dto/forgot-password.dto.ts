import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLowercase, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDTO {
	@ApiProperty()
	@IsEmail()
	@IsLowercase()
	@IsString()
	@IsNotEmpty()
	email: string;
}
