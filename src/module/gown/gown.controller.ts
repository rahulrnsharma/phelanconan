import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { StaffGownDto } from "src/dto/staff-gown.dto";
import { SearchGownDto, StudentGownDto } from "src/dto/student-gown.dto";
import { GownService } from "src/service/gown.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";


@ApiTags('Gown')
@Controller('gown')
export class GownController {
    constructor(private gownService: GownService) { }

    @Post('student')
    addStudent(@Body() studentGownDto: StudentGownDto) {
        return this.gownService.addStudentGown(studentGownDto)
    }

    @Post('staff')
    addstaff(@Body() staffGownDto:StaffGownDto){
     return this.gownService.addStaffGown(staffGownDto)
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('orders/student')
    getOrdersStudent(@Query() query: SearchGownDto) {
        return this.gownService.getAllStudent(query);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('orders/staff')
    getOrdersStaff(@Query() query: SearchGownDto) {
        return this.gownService.getAllStaff(query);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('orders/student/:id')
    @ApiParam({ name: 'id' })
    getOrdersStudentById(@Param('id') id: string) {
        return this.gownService.getByIdStudent(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('orders/staff/:id')
    @ApiParam({ name: 'id' })
    getOrdersStaffById(@Param('id') id: string) {
        return this.gownService.getByIdStaff(id);
    }

    @Post('test-pay')
    testpay() {
        return this.gownService.testpay()
    }
    @Post('initiateauth')
    initiateauth(@Body() data: any) {
        return this.gownService.initiate(data.tid, data.browserdata)
    }
    @Get('initiateauth/:id')
    @ApiParam({ name: 'id' })
    getinitiateauth(@Param('id') id: string) {
        return this.gownService.getAuthentication(id);
    }
    @Post('notification')
    notification(@Body() data: any) {
        console.log(data)
        return this.gownService.notification(data)
    }
    @Post('challenge')
    challenge(@Body() data: any) {
        console.log(data)
        return this.gownService.challenge(data)
    }
}