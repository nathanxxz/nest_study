import { Optional } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsInt, Max, Min } from "class-validator";

export class PaginationDto{
    @Min(0)
    @Max(50)
    @Optional()
    @IsInt()
    @Type(() => Number)
    limite: number;

    @Min(0)
    @Optional()
    @IsInt()
    @Type(() => Number)
    compensacao: number;
}