import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { HasRoles } from "src/decorator/role.decorator";
import { InstituteDto, InstituteImageDto } from "src/dto/institute.dto";
import { ActiveDto, StatusDto } from "src/dto/pagination.dto";
import { SearchDto } from "src/dto/search.dto";
import { ActiveStatusEnum, RoleEnum } from "src/enum/common.enum";
import { IUser } from "src/interface/user.interface";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { RolesGuard } from "src/service/guard/role.guard";
import { InstituteService } from "src/service/institute.service";
import { UtilityService } from "src/service/utility.service";

@ApiTags('Institute')
@Controller('institute')
export class InstituteController {
  constructor(private instituteService: InstituteService) { }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', UtilityService.imageFileFilter("institute")))
  add(@Body() instituteDto: InstituteDto, @CurrentUser() user: IUser, @UploadedFile() file: Express.Multer.File) {
    return this.instituteService.add(instituteDto, user, file)
  }
  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('upload/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('gallery', 10, UtilityService.imageFileFilter("institute")))
  @ApiParam({ name: 'id' })
  async uploadProductImage(@Param('id') id: string, @Body() imageDto: InstituteImageDto, @CurrentUser() user: IUser, @UploadedFiles() files: Array<Express.Multer.File>) {
    return this.instituteService.uploadImage(id, user, (files || []).map(ele => { return { image: `${ele.filename}` } }));
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', UtilityService.imageFileFilter("institute")))
  @ApiParam({ name: 'id' })
  update(@Body() instituteDto: InstituteDto, @Param('id') id: string, @CurrentUser() user: IUser, @UploadedFile() file: Express.Multer.File) {
    return this.instituteService.update(instituteDto, id, user, file)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  getAll(@Query() searchDto: SearchDto) {
    return this.instituteService.getAll(searchDto)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('dropdown')
  dropdown(@Query() statusDto: StatusDto) {
    return this.instituteService.dropdown(statusDto)
  }

  @Get('register/dropdown')
  registerDropdown() {
    return this.instituteService.dropdown({ status: ActiveStatusEnum.ACTIVE })
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id: string) {
    return this.instituteService.getById(id)
  }
  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id/gallery')
  @ApiParam({ name: 'id' })
  async getProductImages(@Param('id') id: string) {
    return this.instituteService.getImages(id);
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('status/:id')
  @ApiParam({ name: 'id' })
  status(@Body() activeDto: ActiveDto, @Param('id') id: string, @CurrentUser() user: IUser) {
    return this.instituteService.status(id, activeDto, user)
  }

  @HasRoles(RoleEnum.ADMIN)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiParam({ name: 'id' })
  @Delete(':id')
  delete(@Param('id') id: string, @CurrentUser() user: IUser) {
    return this.instituteService.delete(id, user)
  }
}
