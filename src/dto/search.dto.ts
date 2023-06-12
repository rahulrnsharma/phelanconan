import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationDto } from "./pagination.dto";
import { IsString, ValidateIf } from "class-validator";

export class SearchDto extends PaginationDto {
    @ApiPropertyOptional()
    @IsString({ message: 'Name should be string.' })
    @ValidateIf(o => o.search)
    search?: string;
}