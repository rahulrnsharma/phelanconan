import { ApiProperty, ApiPropertyOptional, IntersectionType } from "@nestjs/swagger";
import { DateRangeDto, PaginationDto, TimezoneDto } from "./pagination.dto";
import { IsMongoId, IsNotEmpty, ValidateIf } from "class-validator";
import { Type } from "class-transformer";
import { Types } from "mongoose";

export class StudentReportDto extends IntersectionType(PaginationDto, TimezoneDto, DateRangeDto) {
    @ApiPropertyOptional({ type: 'string' })
    @IsMongoId({ message: 'Institute not valid.' })
    @Type(() => Types.ObjectId)
    @ValidateIf(o => o.institute)
    institute?: Types.ObjectId;
    @ApiPropertyOptional({ type: 'string' })
    @IsMongoId({ message: 'Faculty not valid.' })
    @Type(() => Types.ObjectId)
    @ValidateIf(o => o.faculty)
    faculty?: Types.ObjectId;
    @ApiPropertyOptional({ type: 'string' })
    @IsMongoId({ message: 'Course not valid.' })
    @Type(() => Types.ObjectId)
    @ValidateIf(o => o.course)
    course?: Types.ObjectId;
}

export class StaffReportDto extends IntersectionType(PaginationDto, TimezoneDto, DateRangeDto) {
    @ApiPropertyOptional({ type: 'string' })
    @IsMongoId({ message: 'Institute not valid.' })
    @Type(() => Types.ObjectId)
    @ValidateIf(o => o.institute)
    institute?: Types.ObjectId;
}