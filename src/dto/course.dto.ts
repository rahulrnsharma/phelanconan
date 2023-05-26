import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString, minLength } from "class-validator";
import { ObjectId } from "mongoose";


export class CourseDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:"Institute must be required"})
    name:string;
   
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:"Please Selecte Faculty before the Course"})
    faculty:string
}
