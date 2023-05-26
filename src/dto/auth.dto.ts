import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsIP, IsNotEmpty, IsString, ValidateIf } from "class-validator";



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
 