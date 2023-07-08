import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { HasRoles } from "src/decorator/role.decorator";
import { FacultyDto } from "src/dto/faculty.dto";
import { ActiveDto, StatusDto } from "src/dto/pagination.dto";
import { SearchDto } from "src/dto/search.dto";
import { RoleEnum } from "src/enum/common.enum";
import { IUser } from "src/interface/user.interface";
import { FacultyService } from "src/service/faculty.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { RolesGuard } from "src/service/guard/role.guard";


@ApiTags('Faculty')
@Controller('faculty')
export class FacultyController {
  constructor(private facultyService: FacultyService) { }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  add(@Body() facultyDto: FacultyDto, @CurrentUser() user: IUser) {
    return this.facultyService.add(facultyDto, user)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  getAll(@Query() searchDto: SearchDto) {
    return this.facultyService.getAll(searchDto)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('dropdown')
  dropdown(@Query() statusDto: StatusDto) {
    return this.facultyService.dropdown(statusDto)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id: string) {
    return this.facultyService.getById(id)
  }
  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('status/:id')
  @ApiParam({ name: 'id' })
  status(@Body() activeDto: ActiveDto, @Param('id') id: string, @CurrentUser() user: IUser) {
    return this.facultyService.status(id, activeDto, user)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @ApiParam({ name: 'id' })
  update(@Body() facultyDto: FacultyDto, @Param('id') id: string, @CurrentUser() user: IUser) {
    return this.facultyService.update(facultyDto, id, user)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: string, @CurrentUser() user: IUser) {
    return this.facultyService.delete(id, user)
  }
}