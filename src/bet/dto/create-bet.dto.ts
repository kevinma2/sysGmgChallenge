import { IsArray, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateBetDto{
    @IsNotEmpty()
    @IsString()
    idUser: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(0.5)
    betValue: number;

    @IsNotEmpty()
    @IsArray()
    numberSequence: number[];
}