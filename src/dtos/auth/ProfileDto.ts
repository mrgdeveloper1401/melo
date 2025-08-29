import { IsArray, IsDate, IsNumber, IsOptional, isString, IsString } from "class-validator";

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
    
    @IsOptional()
    @IsNumber()
    profile_image?: number;

    @IsOptional()
    @IsNumber()
    banner_image?: number;

    @IsOptional()
    @IsNumber()
    banner_galery_image?: number;
    
}