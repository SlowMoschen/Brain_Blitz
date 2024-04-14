import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { SQL } from 'drizzle-orm';
import { Role } from 'src/Enums/role.enum';

export class UpdateUserSettingsDTO {
	@ApiProperty()
	@IsOptional()
	@IsString()
	theme?: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	language?: string;

	@ApiProperty({ enum: Role, enumName: 'Role', examples: ['user', 'admin'] })
	@IsOptional()
	@IsString()
	roles?: SQL;

	@ApiProperty()
	@IsOptional()
	@IsBoolean()
	is_verified?: boolean;
}
