import { IsEmail, IsNotEmpty, IsString } from "class-validator";


export class LoginByEmailDto {
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

}
