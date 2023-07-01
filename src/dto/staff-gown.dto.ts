
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsInt, IsDate, IsIn, IsString, IsEmail, ValidateIf } from "class-validator";
import { Types } from "mongoose";
import { IsTime } from "src/decorator/validation/time.decorator";
import { HeightTypeEnum, LocationTypeEnum } from "src/enum/common.enum";

export class StaffGownDto {
    @ApiProperty({ type: 'string' })
    @IsMongoId({ message: 'Institute not valid.' })
    @IsNotEmpty({ message: 'Institute is required.' })
    @Type(() => Types.ObjectId)
    institute: Types.ObjectId
    @ApiProperty()
    @IsNotEmpty({ message: "Reference No. must be required" })
    @IsString({ message: "Reference No. must be string" })
    refno: string;
    @ApiProperty()
    @IsTime({ message: "Time should be in (hh:mm:ss) formate" })
    @IsNotEmpty({ message: "Time is required." })
    time: string;
    @ApiProperty({ type: 'string' })
    @IsDate({ message: 'Date is not valid.' })
    @IsNotEmpty({ message: 'Date is required.' })
    @Type(() => Date)
    date: string;
    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: "Hire Duration is required" })
    @IsString({ message: "Hire Duration must be a string" })
    duration: string;
    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: "Graduated Institute is required" })
    @IsString({ message: "Graduated Institute must be a string" })
    graduated: string;
    @ApiProperty({ enum: LocationTypeEnum })
    @IsIn(Object.values(LocationTypeEnum))
    @IsString({ message: 'Location should be string.' })
    @IsNotEmpty({ message: 'Location is required.' })
    location: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Graduation Year must be required" })
    @IsString({ message: "Graduation Year must be string" })
    year: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Faculty must be required" })
    @IsString({ message: "Faculty must be string" })
    faculty: string;
    @ApiPropertyOptional()
    @IsString({ message: "Faculty must be string" })
    faculty_opt?: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Qualification must be required" })
    @IsString({ message: "Qualification must be string" })
    qualification: string;
    @ApiPropertyOptional()
    @IsString({ message: "Faculty must be string" })
    qaulification_opt?: string;
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
    @IsString({ message: "countryCode must be string" })
    @IsNotEmpty({ message: 'countryCode is required.' })
    countryCode: string;
    @ApiProperty()
    @IsString({ message: "Phone must be string" })
    @IsNotEmpty({ message: 'Phone is required.' })
    phone: string;

}

