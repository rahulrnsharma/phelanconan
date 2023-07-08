import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { HasRoles } from "src/decorator/role.decorator";
import { CourseDto } from "src/dto/course.dto";
import { ActiveDto, StatusDto } from "src/dto/pagination.dto";
import { SearchDto } from "src/dto/search.dto";
import { RoleEnum } from "src/enum/common.enum";
import { IUser } from "src/interface/user.interface";
import { CourseService } from "src/service/course.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { RolesGuard } from "src/service/guard/role.guard";

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private CourseService: CourseService) { }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  add(@Body() courseDto: CourseDto, @CurrentUser() user: IUser) {
    return this.CourseService.add(courseDto, user)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  getAll(@Query() searchDto: SearchDto) {
    return this.CourseService.getAll(searchDto)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('dropdown')
  dropdown(@Query() statusDto: StatusDto) {
    return this.CourseService.dropdown(statusDto)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id: string) {
    return this.CourseService.getById(id)
  }
  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('status/:id')
  @ApiParam({ name: 'id' })
  status(@Body() activeDto: ActiveDto, @Param('id') id: string, @CurrentUser() user: IUser) {
    return this.CourseService.status(id, activeDto, user)
  }
  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  @ApiParam({ name: 'id' })
  update(@Body() courseDto: CourseDto, @Param('id') id: string, @CurrentUser() user: IUser) {
    return this.CourseService.update(courseDto, id, user)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: string, @CurrentUser() user: IUser) {
    return this.CourseService.delete(id, user)
  }
}