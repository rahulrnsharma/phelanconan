import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsIn, IsInt, IsMongoId, IsNotEmpty, IsString, ValidateIf } from "class-validator";
import { Types } from "mongoose";
import { IsTime } from "src/decorator/validation/time.decorator";
import { HeightTypeEnum } from "src/enum/common.enum";
import { PaginationDto } from "./pagination.dto";

export class StudentGownDto {
    @ApiProperty({ type: 'string' })
    @IsMongoId({ message: 'Institute not valid.' })
    @IsNotEmpty({ message: 'Institute is required.' })
    @Type(() => Types.ObjectId)
    institute: Types.ObjectId
    @ApiProperty({ type: 'string' })
    @IsMongoId({ message: 'Faculty not valid.' })
    @IsNotEmpty({ message: 'Faculty is required.' })
    @Type(() => Types.ObjectId)
    faculty: Types.ObjectId;
    @ApiProperty({ type: 'string' })
    @IsMongoId({ message: 'Course not valid.' })
    @IsNotEmpty({ message: 'Course is required.' })
    @Type(() => Types.ObjectId)
    course: Types.ObjectId;
    @ApiProperty()
    @IsInt({ message: 'Price should be number.' })
    @IsNotEmpty({ message: 'Price is required.' })
    @Type(() => Number)
    price: number;
    @ApiProperty()
    @IsTime({ message: "Time should be in (hh:mm:ss) formate" })
    @IsNotEmpty({ message: "Time is required." })
    time: string;
    @ApiProperty({ type: 'string' })
    @IsDate({ message: 'Date is not valid.' })
    @IsNotEmpty({ message: 'Date is required.' })
    @Type(() => Date)
    date: string;
    @ApiProperty({ enum: HeightTypeEnum })
    @IsIn(Object.values(HeightTypeEnum))
    @IsString({ message: 'Height should be string.' })
    @IsNotEmpty({ message: 'Height is required.' })
    height: string;
    @ApiProperty()
    @IsString({ message: "Size must be string" })
    @IsNotEmpty({ message: "Size is required." })
    size: string;
    @ApiPropertyOptional()
    requirement?: string;
    @ApiProperty()
    @IsString({ message: "firstName must be string" })
    @IsNotEmpty({ message: 'firstName is required.' })
    firstName: string;
    @ApiPropertyOptional()
    lastName?: string;
    @ApiProperty()
    @IsEmail()
    @IsString({ message: "Email must be string" })
    @IsNotEmpty({ message: 'Email is required.' })
    email: string;
    @ApiProperty()
    @IsString({ message: "Phone must be string" })
    @IsNotEmpty({ message: 'Phone is required.' })
    phone: string;
    @ApiProperty()
    @IsString({ message: "addressLine must be string" })
    @IsNotEmpty({ message: 'addressLine is required.' })
    addressLine: string;
    @ApiPropertyOptional()
    addressLine1?: string;
    @ApiProperty()
    @IsString({ message: "Zipcode must be string" })
    @IsNotEmpty({ message: 'Zipcode is required.' })
    zipcode: string;
    @ApiProperty()
    @IsString({ message: "City must be string" })
    @IsNotEmpty({ message: 'City is required.' })
    city: string;
    @ApiProperty()
    @IsString({ message: "Country must be string" })
    @IsNotEmpty({ message: 'Country is required.' })
    country: string;
}


export class SearchGownDto extends PaginationDto {
    @ApiPropertyOptional()
    @IsString({ message: 'Name should be string.' })
    @ValidateIf(o => o.search)
    search?: string;
}