import { IsBoolean, IsEmail, IsNotEmpty, IsString } from "class-validator";

class SignUpUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsBoolean()
    @IsNotEmpty()
    is_artist: boolean

}

export {
    SignUpUserDto
}
