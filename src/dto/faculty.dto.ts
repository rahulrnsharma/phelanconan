import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";

export class FacultyDto {
    @ApiProperty()
    @IsString({ message: "Faculty must be string" })
    @IsNotEmpty({ message: "Faculty must be required" })
    name: string;

    @ApiProperty({ type: 'string' })
    @IsMongoId({ message: 'Institute not valid.' })
    @Type(() => Types.ObjectId)
    institute: Types.ObjectId
}
