import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { SearchCourseDto, SearchDateDto, SearchFacultyDto, SearchTimeDto } from "src/dto/dropdown.dto";
import { TimezoneDto } from "src/dto/pagination.dto";

import { DropdownService } from "src/service/dropdown.service";


@ApiTags('Dropdown')
@Controller('dropdown')
export class DropdownController {
    constructor(private readonly dropdownService: DropdownService) { }

    @Get('institute')
    getInstitute(@Query() query: TimezoneDto) {
        return this.dropdownService.getInstitute(query);
    }

    @Get('date')
    getDate(@Query() query: SearchDateDto) {
        return this.dropdownService.getDate(query);
    }

    @Get('time')
    getTime(@Query() query: SearchTimeDto) {
        return this.dropdownService.getTime(query);
    }

    @Get('faculty')
    getFaculty(@Query() query: SearchFacultyDto) {
        return this.dropdownService.getFaculty(query);
    }

    @Get('course')
    getCourse(@Query() query: SearchCourseDto) {
        return this.dropdownService.getCourse(query);
    }



}