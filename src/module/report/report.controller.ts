import { Body, Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { DownloadStaffReportDto, DownloadStudentReportDto, StaffReportDto, StudentReportDto } from "src/dto/report.dto";
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
    downloadOrdersStudent(@Query() query: DownloadStudentReportDto, @CurrentUser() user: IUser) {
        return this.reportService.downloadStudentReport(query, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('staff/download')
    downloadOrdersStaff(@Query() query: DownloadStaffReportDto, @CurrentUser() user: IUser) {
        return this.reportService.downloadStaffReport(query, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('student/institute')
    async getStudentReportInstitute(@CurrentUser() user: IUser) {
        return this.reportService.getStudentReportInstitute(user);
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('staff/institute')
    async getStaffReportInstitute(@CurrentUser() user: IUser) {
        return this.reportService.getStaffReportInstitute(user);
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('student/faculty/:institute')
    @ApiParam({ name: 'institute' })
    async getStudentReportFaculty(@Param('institute') institute: string) {
        return this.reportService.getStudentReportFaculty(institute);
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('student/course/:institute/:faculty')
    @ApiParam({ name: 'institute' })
    @ApiParam({ name: 'faculty' })
    async getStudentReportCourse(@Param('institute') institute: string, @Param('faculty') faculty: string) {
        return this.reportService.getStudentReportCourse(institute, faculty);
    }
}