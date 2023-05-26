import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
export class FacultyDto{
    @ApiProperty()
    @IsNotEmpty({message:'Faculty Name must be required'})
    @IsString()
    name: string
  
    @ApiProperty()
    @IsNotEmpty({message:"Please Select the Institute before Faculty"})
    @IsString()
    institute:string
}
