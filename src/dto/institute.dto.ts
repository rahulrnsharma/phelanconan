import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { ImageOptionalDto } from "./pagination.dto";


export class InstituteDto extends ImageOptionalDto {
    @ApiProperty()
    @IsString({ message: "Institute must be string" })
    @IsNotEmpty({ message: "Institute must be required" })
    name: string;
    @ApiProperty()
    @IsInt({ message: 'Price should be number.' })
    @IsNotEmpty({ message: 'Price is required.' })
    @Type(() => Number)
    price: number;
    @ApiProperty()
    @IsString()
    @IsNotEmpty({message:"Reference must be required"})
    refno: string
}
export class InstituteImageDto {
    @ApiProperty({ type: 'array', items: { type: 'file', format: 'binary' }, required: true })
    gallery: Express.Multer.File[];
}