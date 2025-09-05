import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createSongDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsDate()
    @IsNotEmpty()
    release_date: Date;

    @IsNumber()
    @IsNotEmpty()
    audio_id: Number;
}