import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBoolean, IsBooleanString, IsDate, IsInt, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { IsTime } from "src/decorator/validation/time.decorator";
import { ImageOptionalDto } from "./pagination.dto";

export class CeremonyDto extends ImageOptionalDto {
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
    @ApiProperty()
    @IsNotEmpty({ message: "Reference No. must be required" })
    @IsString({ message: "Reference No. must be string" })
    refno: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Collection Location must be required" })
    @IsString({ message: "Collection Location must be string" })
    collectionLocation: string;
    @ApiProperty()
    @IsTime({ message: "Time should be in (hh:mm:ss) formate" })
    @IsNotEmpty({ message: "Time is required." })
    collectionTime: string;
    @ApiProperty()
    @IsBoolean()
    @Type(() => Boolean)
    cap: boolean;
    @ApiProperty()
    @IsNotEmpty({ message: "Return Location must be required" })
    @IsString({ message: "Return Location must be string" })
    returnLocation: string;
    @ApiProperty({ type: 'string' })
    @IsDate({ message: 'Date is not valid.' })
    @IsNotEmpty({ message: 'Date is required.' })
    @Type(() => Date)
    deadline: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Hood must be required" })
    @IsString({ message: "Hood must be string" })
    hood: string;
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