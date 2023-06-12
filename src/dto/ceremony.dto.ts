import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsInt, IsMongoId, IsNotEmpty } from "class-validator";
import { Types } from "mongoose";
import { IsTime } from "src/decorator/validation/time.decorator";


export class CeremonyDto {
    @ApiProperty()
    // @IsMongoId({ message: 'Institute not valid.' })
    @IsNotEmpty({ message: 'Institute is required.' })
    institute: string
    @ApiProperty()
    // @IsMongoId({ message: 'Faculty not valid.' })
    @IsNotEmpty({ message: 'Faculty is required.' })
    faculty: string;
    @ApiProperty()
    // @IsMongoId({ message: 'Course not valid.' })
    @IsNotEmpty({ message: 'Course is required.' })
    course: string;
    @ApiProperty()
    @IsInt({ message: 'Price should be number.' })
    @IsNotEmpty({ message: 'Price is required.' })
    @Type(() => Number)
    price: number;
    @ApiProperty()
    @IsTime({ message: "Time should be in (hh:mm:ss) formate" })
    @IsNotEmpty({ message: "Time is required." })
    time: string;
    @ApiProperty({ type: 'string' })
    @IsDate({ message: 'Date is not valid.' })
    @IsNotEmpty({ message: 'Date is required.' })
    @Type(() => Date)
    date: string;
}


export class ExcelFileDto {
    @ApiProperty({ type: 'file', format: 'binary', required: true })
    excel: Express.Multer.File;
}
export class UploadExcelData {
    @ApiProperty({ type: [Object] })
    @IsArray()
    @ArrayMinSize(1)
    @IsNotEmpty({ message: 'Data is required.' })
    data: Object[]
}