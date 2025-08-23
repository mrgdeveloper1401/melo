import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerifyOtpPhoneDto {
    @IsString()
    @IsNotEmpty()
    mobile_phone: string;

    @IsNumber()
    @IsNotEmpty()
    code: number;
}