import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, minLength } from "class-validator";


export class InstituteDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:"Institute must be required"})
    name:string;

}
