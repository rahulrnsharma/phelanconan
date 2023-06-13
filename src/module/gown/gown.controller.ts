import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StudentGownDto } from "src/dto/student-gown.dto";
import { GownService } from "src/service/gown.service";


@ApiTags('Gown')
@Controller('gown')
export class GownController {
    constructor(private gownService: GownService) { }

    @Post('student')
    add(@Body() studentGownDto: StudentGownDto) {
        return this.gownService.addStudentGown(studentGownDto)
    }
}