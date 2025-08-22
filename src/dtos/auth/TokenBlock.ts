import { IsNotEmpty, IsString } from "class-validator";

export class TokenBlockDto {
    
    @IsString()
    @IsNotEmpty()
    refresh_token: string;
}
