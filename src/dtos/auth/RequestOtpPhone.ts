import { IsNotEmpty, IsString } from "class-validator";

export class RequestOtpPhoneDto {
    @IsString()
    @IsNotEmpty()
    mobile_phone: string;

}