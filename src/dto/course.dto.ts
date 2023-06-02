import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";


export class CourseDto {
    @ApiProperty()
    @IsString({ message: "Course must be string" })
    @IsNotEmpty({ message: "Course must be required" })
    name: string;
}
