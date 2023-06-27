import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { AdminDto } from "./admin.dto";

export class InstituteStaffDto extends AdminDto {
    @ApiProperty()
    @IsNotEmpty({ message: "Institute is required" })
    institute: string; 
}

export class UpdateInstituteStaffDto extends PartialType(InstituteStaffDto) {}