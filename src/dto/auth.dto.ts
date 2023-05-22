import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty({message:"username must be required"})
    @IsString()
    username:string;

    @ApiProperty()
    @IsNotEmpty({message:"Password must be required"})
    @IsString()
    password: string;
    @ApiProperty()
    isLoggedIn:boolean;
    @ApiProperty()
    loggedInAt:Date;
    @ApiProperty()
    loggedOutAt:Date


} 