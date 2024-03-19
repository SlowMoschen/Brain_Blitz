import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLowercase, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(2, { message: 'First name is too short' })
	first_name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(2, { message: 'Last name is too short' })
	last_name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsLowercase()
	@IsString()
	@IsEmail()
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MinLength(8, { message: 'Password is too short' })
	@Matches(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character' })
	@Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
	@Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
	@Matches(/[0-9]/, { message: 'Password must contain at least one number' })
	password: string;
}
