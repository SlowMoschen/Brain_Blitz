import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";
import { SQL } from "drizzle-orm";

export class UpdateUserSettingsDTO {
    @IsOptional()
    @IsString()
    theme: string;

    @IsOptional()
    @IsString()
    language: string;

    @IsOptional()
    @IsString()
    @IsArray()
    roles: SQL;

    @IsOptional()
    @IsBoolean()
    is_verified: boolean;

}

