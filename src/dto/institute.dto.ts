import { ApiProperty, IntersectionType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { ImageOptionalDto } from "./pagination.dto";


export class InstituteDto {
    @ApiProperty()
    @IsString({ message: "Institute must be string" })
    @IsNotEmpty({ message: "Institute must be required" })
    name: string;
    @ApiProperty()
    @IsInt({ message: 'Price should be number.' })
    @IsNotEmpty({ message: 'Price is required.' })
    @Type(() => Number)
    price: number;
}
export class AddInstituteDto extends IntersectionType(InstituteDto, ImageOptionalDto) {
}
export class InstituteImageDto {
    @ApiProperty({ type: 'array', items: { type: 'file', format: 'binary' }, required: true })
    gallery: Express.Multer.File[];
}