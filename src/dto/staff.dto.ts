import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsMongoId, IsNotEmpty, IsString, MinLength, ValidateIf } from "class-validator";

export class StaffDto {
    @ApiProperty()
    @IsMongoId({ message: 'Institute not valid.' })
    @IsNotEmpty({ message: 'Institute is required.' })
    institute: string
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
    @MinLength(6, { message: 'Password should be minimum 6 character.' })
    @IsNotEmpty({ message: 'Password is required.' })
    password: string;
    @ApiProperty()
    @IsString({ message: "countryCode must be string" })
    @IsNotEmpty({ message: 'countryCode is required.' })
    countryCode: string;
    @ApiProperty()
    @IsString({ message: "Phone must be string" })
    @IsNotEmpty({ message: 'Phone is required.' })
    phone: string;
    @ApiProperty()
    @IsString({ message: "Designation be string" })
    @IsNotEmpty({ message: 'Designation is required.' })
    designation: string;
}