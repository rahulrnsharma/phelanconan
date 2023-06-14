import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsIn, IsInt, IsString, Min, ValidateIf } from "class-validator";
import { ActiveStatusEnum } from "src/enum/common.enum";

export class PaginationDto {
    @ApiProperty()
    @Min(1, { message: 'Current page should be greater than 0.' })
    @IsInt({ message: 'Current page should be a number.' })
    @Type(() => Number)
    currentPage: number;
    @ApiProperty({ enum: [10, 20, 30, 50, 100] })
    @IsInt({ message: 'Page size should be a number.' })
    @Type(() => Number)
    pageSize: number;
    @ApiPropertyOptional({ enum: Object.values(ActiveStatusEnum) })
    @IsIn(Object.values(ActiveStatusEnum))
    @IsString({ message: 'Active should be string.' })
    @ValidateIf(o => o.status)
    status?: string;
}
export class TimezoneDto {
    @ApiProperty()
    @IsInt({ message: 'Timezone should be a number.' })
    @Type(() => Number)
    timezone: number;
}
export class ActiveDto {
    @ApiProperty()
    @Type(() => Boolean)
    active: boolean;
}
export class ImageDto {
    @ApiProperty({ type: 'file', format: 'binary', required: true })
    image: Express.Multer.File
}
export class ImageOptionalDto {
    @ApiProperty({ type: 'file', format: 'binary', required: false })
    image: Express.Multer.File
}