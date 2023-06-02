import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { InstituteDto } from "src/dto/institute.dto";
import { IAdmin } from "src/interface/admin.interface";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { InstituteService } from "src/service/institute.service";

@ApiTags('Institute')
@Controller('institute')
export class InstituteController {
  constructor(private instituteService: InstituteService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('')
  add(@Body() instituteDto: InstituteDto, @CurrentUser() user: IAdmin) {
    return this.instituteService.add(instituteDto, user)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  getAll() {
    return this.instituteService.getAll()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('dropdown')
  dropdown() {
    return this.instituteService.dropdown()
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id: string) {
    return this.instituteService.getById(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @ApiParam({ name: 'id' })
  update(@Body() instituteDto: InstituteDto, @Param('id') id: string, @CurrentUser() user: IAdmin) {
    return this.instituteService.update(instituteDto, id, user)
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: IAdmin) {
    return this.instituteService.delete(id, user)
  }
}
