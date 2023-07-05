import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { StaffReportDto, StudentReportDto } from "src/dto/report.dto";
import { IUser } from "src/interface/user.interface";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { ReportService } from "src/service/report.service";


@ApiTags('Report')
@Controller('report')
export class ReportController {
    constructor(private reportService: ReportService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('student')
    getOrdersStudent(@Query() query: StudentReportDto, @CurrentUser() user: IUser) {
        return this.reportService.getStudentReport(query, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('staff')
    getOrdersStaff(@Query() query: StaffReportDto, @CurrentUser() user: IUser) {
        return this.reportService.getStaffReport(query, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('student/download')
    downloadOrdersStudent(@Query() query: StudentReportDto, @CurrentUser() user: IUser) {
        return this.reportService.downloadStudentReport(query, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('staff/download')
    downloadOrdersStaff(@Query() query: StaffReportDto, @CurrentUser() user: IUser) {
        return this.reportService.downloadStaffReport(query, user);
    }
}