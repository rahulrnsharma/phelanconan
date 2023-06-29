import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { HasRoles } from "src/decorator/role.decorator";
import { SearchDto } from "src/dto/search.dto";
import { StaffDto } from "src/dto/staff.dto";
import { RoleEnum } from "src/enum/common.enum";
import { IUser } from "src/interface/user.interface";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { RolesGuard } from "src/service/guard/role.guard";
import { StaffService } from "src/service/staff.service";

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
    constructor(private staffService: StaffService) { }


    @Post('')
    register(@Body() staffDto: StaffDto) {
        return this.staffService.create(staffDto)
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/approve')
    @ApiParam({ name: 'id' })
    approve(@Param('id') id: string, @CurrentUser() user: IUser) {
        return this.staffService.approve(id, user)
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/reject')
    @ApiParam({ name: 'id' })
    reject(@Param('id') id: string, @CurrentUser() user: IUser) {
        return this.staffService.reject(id, user)
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put(':id/activate')
    @ApiParam({ name: 'id' })
    activate(@Param('id') id: string, @CurrentUser() user: IUser) {
        return this.staffService.activate(id, user)
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete(':id')
    @ApiParam({ name: 'id' })
    delete(@Param('id') id: string, @CurrentUser() user: IUser) {
        return this.staffService.delete(id, user)
    }

    @HasRoles(RoleEnum.ADMIN)
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('')
    getAll(@Query() searchDto: SearchDto) {
        return this.staffService.getAll(searchDto)
    }
}