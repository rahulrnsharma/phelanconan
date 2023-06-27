import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { InstituteDto, InstituteImageDto } from "src/dto/institute.dto";
import { ActiveDto } from "src/dto/pagination.dto";
import { SearchDto } from "src/dto/search.dto";
import { IUser } from "src/interface/user.interface";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { InstituteService } from "src/service/institute.service";
import { UtilityService } from "src/service/utility.service";

@ApiTags('Institute')
@Controller('institute')
export class InstituteController {
  constructor(private instituteService: InstituteService) { }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', UtilityService.imageFileFilter("institute")))
  add(@Body() instituteDto: InstituteDto, @CurrentUser() user: IUser, @UploadedFile() file: Express.Multer.File) {
    return this.instituteService.add(instituteDto, user, file)
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('upload/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('gallery', 10, UtilityService.imageFileFilter("institute")))
  @ApiParam({ name: 'id' })
  async uploadProductImage(@Param('id') id: string, @Body() imageDto: InstituteImageDto, @CurrentUser() user: IUser, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.instituteService.uploadImage(id, user, (files || []).map(ele => { return { image: `${ele.filename}` } }));
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', UtilityService.imageFileFilter("institute")))
  @ApiParam({ name: 'id' })
  update(@Body() instituteDto: InstituteDto, @Param('id') id: string, @CurrentUser() user: IUser, @UploadedFile() file: Express.Multer.File) {
    return this.instituteService.update(instituteDto, id, user, file)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  getAll(@Query() searchDto: SearchDto) {
    return this.instituteService.getAll(searchDto)
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
  @Get(':id/gallery')
  @ApiParam({ name: 'id' })
  async getProductImages(@Param('id') id: string) {
    return this.instituteService.getImages(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('status/:id')
  @ApiParam({ name: 'id' })
  status(@Body() activeDto: ActiveDto, @Param('id') id: string, @CurrentUser() user: IUser) {
    return this.instituteService.status(id, activeDto, user)
  }

  @ApiBearerAuth()
  @ApiParam({ name: 'id' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: IUser) {
    return this.instituteService.delete(id, user)
  }
}
