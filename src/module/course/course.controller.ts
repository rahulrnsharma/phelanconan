import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { CourseDto } from "src/dto/course.dto";
import { ActiveDto } from "src/dto/pagination.dto";
import { SearchDto } from "src/dto/search.dto";
import { IUser } from "src/interface/user.interface";
import { CourseService } from "src/service/course.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";

@ApiTags('Course')
@Controller('course')
export class CourseController {
  constructor(private CourseService: CourseService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('')
  add(@Body() courseDto: CourseDto, @CurrentUser() user: IUser) {
    return this.CourseService.add(courseDto, user)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  getAll(@Query() searchDto: SearchDto) {
    return this.CourseService.getAll(searchDto)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('dropdown')
  dropdown() {
    return this.CourseService.dropdown()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id: string) {
    return this.CourseService.getById(id)
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('status/:id')
  @ApiParam({ name: 'id' })
  status(@Body() activeDto: ActiveDto, @Param('id') id: string, @CurrentUser() user: IUser) {
    return this.CourseService.status(id, activeDto, user)
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id' })
  update(@Body() courseDto: CourseDto, @Param('id') id: string, @CurrentUser() user: IUser) {
    return this.CourseService.update(courseDto, id, user)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: string, @CurrentUser() user: IUser) {
    return this.CourseService.delete(id, user)
  }
}