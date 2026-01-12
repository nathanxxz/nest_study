import { PartialType } from "@nestjs/mapped-types";
import { criarUserDto } from "./criar-user-dto";


export class atualizarUserDto extends PartialType(criarUserDto){
    
}