import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class InstituteDto {
    @ApiProperty()
    @IsString({ message: "Institute must be string" })
    @IsNotEmpty({ message: "Institute must be required" })
    name: string;
}
