import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsDate, IsString, IsArray, ArrayMinSize } from "class-validator";
import { IsTime } from "src/decorator/validation/time.decorator";
import { ImageOptionalDto } from "./pagination.dto";

export class StaffCeremonyDto extends ImageOptionalDto {
    @ApiProperty()
    // @IsMongoId({ message: 'Institute not valid.' })
    @IsNotEmpty({ message: 'Institute is required.' })
    institute: string;
    @ApiProperty()
    @IsTime({ message: "Time should be in (hh:mm:ss) formate" })
    @IsNotEmpty({ message: "Time is required." })
    time: string;
    @ApiProperty({ type: 'string' })
    @IsDate({ message: 'Date is not valid.' })
    @IsNotEmpty({ message: 'Date is required.' })
    @Type(() => Date)
    date: string;
    @ApiProperty({ type: 'string' })
    @IsNotEmpty({ message: "Hire Duration is required" })
    @IsString({ message: "Hire Duration must be a string" })
    duration: string;
    @ApiProperty()
    @IsNotEmpty({ message: "Reference No. must be required" })
    @IsString({ message: "Reference No. must be string" })
    refno: string;
    @ApiProperty({ type: 'string' })
    @IsDate({ message: 'Deadline is not valid.' })
    @IsNotEmpty({ message: 'Deadline is required.' })
    @Type(() => Date)
    deadline: string;

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