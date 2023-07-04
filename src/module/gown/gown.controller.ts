import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { HasRoles } from "src/decorator/role.decorator";
import { StaffGownDto } from "src/dto/staff-gown.dto";
import { SearchGownDto, StudentGownDto } from "src/dto/student-gown.dto";
import { RoleEnum } from "src/enum/common.enum";
import { GownService } from "src/service/gown.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { RolesGuard } from "src/service/guard/role.guard";


@ApiTags('Gown')
@Controller('gown')
export class GownController {
    constructor(private gownService: GownService) { }

    @Post('student')
    addStudent(@Body() studentGownDto: StudentGownDto) {
        return this.gownService.addStudentGown(studentGownDto)
    }

    @Post('staff')
    addstaff(@Body() staffGownDto: StaffGownDto) {
        return this.gownService.addStaffGown(staffGownDto)
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('orders/student')
    getOrdersStudent(@Query() query: SearchGownDto) {
        return this.gownService.getAllStudentGown(query);
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('orders/staff')
    getOrdersStaff(@Query() query: SearchGownDto) {
        return this.gownService.getAllStaffGown(query);
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('orders/student/:id')
    @ApiParam({ name: 'id' })
    getOrdersStudentById(@Param('id') id: string) {
        return this.gownService.getStudentGownById(id);
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('orders/staff/:id')
    @ApiParam({ name: 'id' })
    getOrdersStaffById(@Param('id') id: string) {
        return this.gownService.getStaffGownById(id);
    }
}