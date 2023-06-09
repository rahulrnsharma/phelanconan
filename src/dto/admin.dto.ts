import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator";


export class AdminDto {
    @ApiProperty()
    @IsString({ message: "First Name must be a string" })
    @IsNotEmpty({ message: 'first name is required' })
    firstName: string
    @ApiPropertyOptional()
    @IsString({ message: "last name must be a string" })
    @IsNotEmpty({ message: 'last name is required' })
    @ValidateIf(o => o.lastName)
    lastName: string
    @ApiProperty()
    @IsEmail()
    @IsString({ message: "Email must be string" })
    @IsNotEmpty({ message: 'Email is required.' })
    email: string;
    @ApiProperty()
    @MinLength(2)
    @IsNotEmpty({ message: 'User name is required.' })
    username: string;
    @ApiProperty()
    @MinLength(6, { message: 'Password should be minimum 6 character.' })
    @IsNotEmpty({ message: 'Password is required.' })
    password: string;
}