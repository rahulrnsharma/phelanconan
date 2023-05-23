import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, minLength } from "class-validator";


export class CourseDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:"Institute must be required"})
    course:string;
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:"Institute must be required"})
    code:string;

}
