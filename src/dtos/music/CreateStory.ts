import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStoryDto {
    @IsNumber()
    @IsNotEmpty()
    image_id: number;

    @IsString()
    caption?: string;
}
