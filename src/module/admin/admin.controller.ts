import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { AdminDto } from "src/dto/admin.dto";
import { IAdmin } from "src/interface/admin.interface";

import { AdminService } from "src/service/admin.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";


@ApiTags('Admin')
@Controller('admin')
export class AdminController {
    constructor(private adminService: AdminService) { }

    @ApiExcludeEndpoint()
    @Post('')
    create(@Body() adminDto: AdminDto) {
        return this.adminService.create(adminDto)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    profile(@CurrentUser() user: IAdmin) {
        return this.adminService.profile(user)
    }

}


