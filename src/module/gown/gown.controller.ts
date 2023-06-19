import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { SearchGownDto, StudentGownDto } from "src/dto/student-gown.dto";
import { GownService } from "src/service/gown.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";


@ApiTags('Gown')
@Controller('gown')
export class GownController {
    constructor(private gownService: GownService) { }

    @Post('student')
    add(@Body() studentGownDto: StudentGownDto) {
        return this.gownService.addStudentGown(studentGownDto)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('orders')
    getOrders(@Query() query: SearchGownDto) {
        return this.gownService.getAll(query);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('orders/:id')
    @ApiParam({ name: 'id' })
    getOrdersById(@Param('id') id: string) {
        return this.gownService.getById(id);
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