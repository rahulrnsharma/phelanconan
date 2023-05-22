import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";


export class AdminDto{
    @ApiProperty()
    @MinLength(2)
    @IsNotEmpty({message:'Name must be required'})
    name: string;
    
    @ApiProperty()
    @MinLength(2)
    @IsNotEmpty({message:'username must be required'})
    @IsString()
    username: String;

    @ApiProperty()
    @IsNotEmpty({message:'Password must be required'})
    @MinLength(2,{message:'Password must be contain atleast 6 character'})
    @IsString()
    password: String
    
}


