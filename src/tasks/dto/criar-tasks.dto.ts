import { IsEmpty, IsNotEmpty, IsNumber, IsString  } from "class-validator";


export class criarTaskDto{

  @IsString({message: "O nome tem que ser do tipo string"})

  readonly  nome: string;

  @IsString()
  @IsNotEmpty()
  readonly  descricao: string;


  @IsNotEmpty()
  @IsNumber()
  readonly userId: number
  
}