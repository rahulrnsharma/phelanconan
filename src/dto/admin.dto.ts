import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";


export class AdminDto {
    @ApiProperty()
    @MinLength(2)
    @IsNotEmpty({ message: 'First Name is required.' })
    name: string;
    @ApiProperty()
    @MinLength(2)
    @IsNotEmpty({ message: 'User name is required.' })
    username: string;
    @ApiProperty()
    @MinLength(6, { message: 'Password should be minimum 6 character.' })
    @IsNotEmpty({ message: 'Password is required.' })
    password: string;
}