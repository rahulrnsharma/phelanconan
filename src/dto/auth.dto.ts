import { ApiProperty } from "@nestjs/swagger";
import {  IsNotEmpty, IsString,  } from "class-validator";



export class AdminLoginDto {
    @ApiProperty()
    @IsNotEmpty({message:"username must be required"})
    @IsString()
    username:string;

    @ApiProperty()
    @IsNotEmpty({message:"Password must be required"})
    @IsString()
    password: string;
}
 