import { Controller, Get, Query } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { DropdownService } from "src/service/dropdown.service";


@ApiTags('Dropdown')
@Controller('dropdown')
export class DropdownController {
    constructor(private readonly dropdownService: DropdownService) { }

    @Get('/institute')
    getInstitute() {
        return this.dropdownService.getInstitute();
    }

    @Get('date')
    getDate(@Query('insituteId') instituteId: string) {
        return this.dropdownService.getDate(instituteId);
    }

    @Get('Time')
    getTime(@Query('insituteId') instituteId: string, @Query('dateValue') dateValue: string) {
        return this.dropdownService.getTime(instituteId, dateValue);
    }

    @Get('/faculty')
    getFaculty(@Query('instituteId') instituteId: string, @Query('dateValue') dateValue: string, @Query('timeValue') timeValue: string) {
        return this.dropdownService.getFaculty(instituteId, dateValue, timeValue);
    }

    @Get('/course')
    getCourse(@Query('instituteId') instituteId: string, @Query('dateValue') dateValue: string, @Query('timeValue') timeValue: string, @Query('facultyId') facultyId: string) {
        return this.dropdownService.getCourse(instituteId, dateValue, timeValue, facultyId);
    }



}