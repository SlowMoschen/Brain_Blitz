import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class ResetPasswordDTO {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	userID: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	token: string;

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
