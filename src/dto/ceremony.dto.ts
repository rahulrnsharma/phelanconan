import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { IsTime } from "src/decorator/validation/time.decorator";


export class CeremonyDto {
    @ApiProperty({ type: 'string' })
    @IsMongoId({ message: 'Institute not valid.' })
    @IsNotEmpty({ message: 'Institute is required.' })
    @Type(() => Types.ObjectId)
    institute: Types.ObjectId
    @ApiProperty({ type: 'string' })
    @IsMongoId({ message: 'Faculty not valid.' })
    @IsNotEmpty({ message: 'Faculty is required.' })
    @Type(() => Types.ObjectId)
    faculty: Types.ObjectId;
    @ApiProperty({ type: 'string' })
    @IsMongoId({ message: 'Course not valid.' })
    @IsNotEmpty({ message: 'Course is required.' })
    @Type(() => Types.ObjectId)
    course: Types.ObjectId;
    @ApiProperty()
    @IsInt({ message: 'Price should be number.' })
    @IsNotEmpty({ message: 'Price is required.' })
    price: number;
    @ApiProperty()
    @IsTime({ message: "Time should be in (hh:mm:ss am/pm) formate" })
    @IsNotEmpty({ message: "Time is required." })
    time: string;
    @ApiProperty({ type: 'string' })
    @IsDate({ message: 'Date is not valid.' })
    @IsNotEmpty({ message: 'Date is required.' })
    @Type(() => Date)
    date: string;
}