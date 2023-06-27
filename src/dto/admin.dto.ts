import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class AdminDto {
    @ApiProperty()
    @IsString({ message: "First Name must be a string" })
    @IsNotEmpty({ message: 'first name is required' })
    firstName: string
    @ApiProperty()
    @IsString({ message: "last name must be a string" })
    @IsNotEmpty({ message: 'last name is required' })
    lastName: string
    @ApiProperty()
    @IsEmail()
    @IsString({ message: "Email must be string" })
    @IsNotEmpty({ message: 'Email is required.' })
    email: string;
    @ApiProperty()
    @IsString({ message: "Phone must be string" })
    @IsNotEmpty({ message: 'Phone is required.' })
    phone: string;
    @ApiProperty()
    @IsString({message:"Designation must be a string"})
    @IsNotEmpty({message:"Designation is required"})
    designation:string
    @ApiProperty()
    @MinLength(2)
    @IsNotEmpty({ message: 'User name is required.' })
    username: string;
    @ApiProperty()
    @MinLength(6, { message: 'Password should be minimum 6 character.' })
    @IsNotEmpty({ message: 'Password is required.' })
    password: string;
}