import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { FacultyDto } from "src/dto/faculty.dto";
import { IAdmin } from "src/interface/admin.interface";
import { FacultyService } from "src/service/faculty.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";


@ApiTags('Faculty')
@Controller('faculty')
export class FacultyController {
  constructor(private facultyService: FacultyService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('')
  add(@Body() facultyDto: FacultyDto, @CurrentUser() user: IAdmin) {
    return this.facultyService.add(facultyDto, user)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  getAll() {
    return this.facultyService.getAll()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('dropdown')
  dropdown() {
    return this.facultyService.dropdown()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id: string) {
    return this.facultyService.getById(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id' })
  update(@Body() facultyDto: FacultyDto, @Param('id') id: string, @CurrentUser() user: IAdmin) {
    return this.facultyService.update(facultyDto, id, user)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiParam({ name: 'id' })
  delete(@Param('id') id: string, @CurrentUser() user: IAdmin) {
    return this.facultyService.delete(id, user)
  }
}