import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class  confirmForgetPasswordDto {
    @IsNumber()
    @IsNotEmpty()
    code: number;

    @IsString()
    @IsNotEmpty()
    new_password: string;

    @IsString()
    @IsNotEmpty()
    confirm_new_password: string;

    @IsString()
    @IsNotEmpty()
    mobile_phone: string;
}
