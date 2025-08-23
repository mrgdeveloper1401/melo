import { IsArray, IsDate, IsOptional, isString, IsString } from "class-validator";

export class ProfileDto {

    @IsOptional()
    @IsString()
    first_name?: string

    @IsOptional()
    @IsString()
    last_name?: string

    @IsOptional()
    @IsDate()
    birth_date?: Date

    @IsOptional()
    @IsString()
    bio?: string;

    @IsOptional()
    @IsArray()
    jobs?: string[];

    @IsOptional()
    @IsArray()
    social?: string[];
    
}