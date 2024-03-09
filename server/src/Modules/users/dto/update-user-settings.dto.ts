import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { SQL } from "drizzle-orm";

export class UpdateUserSettingsDTO {

    @ApiProperty()
    @IsOptional()
    @IsString()
    theme: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    language: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    @IsArray()
    roles: SQL;

    @ApiProperty()
    @IsOptional()
    @IsBoolean()
    is_verified: boolean;

}

