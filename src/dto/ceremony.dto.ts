import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsBooleanString, IsDate, IsInt, IsMongoId, IsNotEmpty, IsString } from "class-validator";
import { Types } from "mongoose";
import { IsTime } from "src/decorator/validation/time.decorator";
import { ImageOptionalDto } from "./pagination.dto";


export class CeremonyDto extends ImageOptionalDto {
    @ApiProperty()
    // @IsMongoId({ message: 'Institute not valid.' })
    @IsNotEmpty({ message: 'Institute is required.' })
    institute: string
    @ApiProperty()
    @IsNotEmpty({message:"Reference No. must be required"})
    refno: string;
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
    @ApiProperty({type:'string'})
    @IsString()
    @IsNotEmpty()
    collection_location:string;
    @ApiProperty()
    @IsTime({ message: "Time should be in (hh:mm:ss) formate" })
    @IsNotEmpty({ message: "Time is required." })
    collection_time: string;
    @ApiProperty()
    @IsBooleanString()
    cap:boolean;

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