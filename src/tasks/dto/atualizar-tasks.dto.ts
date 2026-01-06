import { PartialType } from "@nestjs/mapped-types";
import { criarTaskDto } from "./criar-tasks.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class atualizarTaskDto extends PartialType(criarTaskDto){
    
    @IsBoolean()
    @IsOptional()
    completo?: boolean;
}