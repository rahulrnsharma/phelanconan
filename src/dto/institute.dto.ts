import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";
import { ImageOptionalDto } from "./pagination.dto";


export class InstituteDto extends ImageOptionalDto {
    @ApiProperty()
    @IsString({ message: "Institute must be string" })
    @IsNotEmpty({ message: "Institute must be required" })
    name: string;
    @ApiProperty()
    @IsPositive({ message: 'Price shuld be positive' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price should be number.' })
    @IsNotEmpty({ message: 'Price is required.' })
    @Type(() => Number)
    price: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty({ message: "Reference must be required" })
    refno: string
}
export class InstituteImageDto {
    @ApiProperty({ type: 'array', items: { type: 'file', format: 'binary' }, required: true })
    @IsArray()
    gallery: Express.Multer.File[];
}