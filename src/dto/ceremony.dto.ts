import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CeremonyDto {
    @ApiProperty()
    @IsNotEmpty({message:"Please Select Institute"})
    @IsString()
    institute:string;
    @ApiProperty()
    @IsNotEmpty({message:"Please Select Faculty"})
    @IsString()
    faculty:string;
    @ApiProperty()
    @IsNotEmpty({message:"Please Select Course"})
    @IsString()
    course:string;
    @ApiProperty()
    @IsNotEmpty({message:"Please Select Price"})
    @IsNumber()
    price:number;
    @ApiProperty()
    @IsNotEmpty({message:"Please Select the Time"})
    @IsString()
    time:string;
    @ApiProperty()
    @IsNotEmpty({message:"Please Select the Date"})
    // @IsDate()
    date:string;

}