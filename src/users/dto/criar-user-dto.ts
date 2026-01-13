import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class criarUserDto {

    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(12)
    senha: string;

    

}