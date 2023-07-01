import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { StaffReportDto, StudentReportDto } from "src/dto/report.dto";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { ReportService } from "src/service/report.service";


@ApiTags('Report')
@Controller('report')
export class ReportController {
    constructor(private reportService: ReportService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('student')
    getOrdersStudent(@Query() query: StudentReportDto) {
        return this.reportService.getStudentReport(query);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('staff')
    getOrdersStaff(@Query() query: StaffReportDto) {
        return this.reportService.getStaffReport(query);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('student/download')
    downloadOrdersStudent(@Query() query: StudentReportDto) {
        return this.reportService.downloadStudentReport(query);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('staff/download')
    downloadOrdersStaff(@Query() query: StaffReportDto) {
        return this.reportService.downloadStaffReport(query);
    }
}