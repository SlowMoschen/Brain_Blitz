import { IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

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
    roles: string[];

    @IsOptional()
    @IsBoolean()
    is_verified: boolean;

}

