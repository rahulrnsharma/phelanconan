import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsMongoId, IsNotEmpty } from "class-validator";
import { TimezoneDto } from "./pagination.dto";
import { Type } from "class-transformer";
import { IsTime } from "src/decorator/validation/time.decorator";

export class SearchDateDto extends TimezoneDto {
    @ApiProperty()
    @IsMongoId({ message: 'Institute not valid.' })
    @IsNotEmpty({ message: 'Institute is required.' })
    institute: string
}
export class SearchTimeDto extends SearchDateDto {
    @ApiProperty({ type: 'string' })
    @IsDate({ message: 'Date is not valid.' })
    @IsNotEmpty({ message: 'Date is required.' })
    @Type(() => Date)
    date: Date;
}
export class SearchFacultyDto extends SearchTimeDto {
    @ApiProperty()
    @IsTime({ message: "Time should be in (hh:mm:ss) formate" })
    @IsNotEmpty({ message: "Time is required." })
    time: string;
}
export class SearchCourseDto extends SearchFacultyDto {
    @ApiProperty()
    @IsMongoId({ message: 'Faculty not valid.' })
    @IsNotEmpty({ message: 'Faculty is required.' })
    faculty: string
}