import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { CeremonyDto, ExcelFileDto, UploadExcelData } from "src/dto/ceremony.dto";
import { ActiveDto } from "src/dto/pagination.dto";
import { SearchDto } from "src/dto/search.dto";
import { StaffCeremonyDto } from "src/dto/staff-ceremony.dto";
import { IUser } from "src/interface/user.interface";
import { CeremonyService } from "src/service/ceremony.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { UtilityService } from "src/service/utility.service";

@ApiTags('Ceremony')
@Controller('ceremony')
export class CeremonyController {
    constructor(private ceremonyService: CeremonyService) { }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image', UtilityService.imageFileFilter("institute")))
    add(@Body() ceremonyDto: CeremonyDto, @CurrentUser() user: IUser, @UploadedFile() file: Express.Multer.File) {
        return this.ceremonyService.add(ceremonyDto, user, file);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('excel/verify')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('excel', UtilityService.excelFileFilter()))
    async verify(@Body() excelFileDto: ExcelFileDto, @CurrentUser() user: IUser, @UploadedFile() file: Express.Multer.File) {
        return this.ceremonyService.verify(file);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('excel/upload')
    async upload(@Body() uploadExcelData: UploadExcelData, @CurrentUser() user: IUser) {
        return this.ceremonyService.upload(uploadExcelData.data, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('staff')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image', UtilityService.imageFileFilter("institute")))
    addStaffCeremony(@Body() staffCeremonyDto:StaffCeremonyDto ,@CurrentUser() user:IUser, @UploadedFile() file:Express.Multer.File){
        return this.ceremonyService.addStaffCeremony(staffCeremonyDto,user,file);
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('staff')
    getAllStaffCeremony(@Query() searchDto: SearchDto) {
        return this.ceremonyService.getAllStaffCeremony(searchDto)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post(':id')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image', UtilityService.imageFileFilter("institute")))
    @ApiParam({ name: 'id' })
    update(@Body() ceremonyDto: CeremonyDto, @Param('id') id: string, @CurrentUser() user: IUser, @UploadedFile() file: Express.Multer.File) {
        return this.ceremonyService.update(ceremonyDto, id, user, file)
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll(@Query() searchDto: SearchDto) {
        return this.ceremonyService.getAll(searchDto)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    @ApiParam({ name: 'id' })
    getById(@Param('id') id: string) {
        return this.ceremonyService.getById(id);
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('status/:id')
    @ApiParam({ name: 'id' })
    status(@Body() activeDto: ActiveDto, @Param('id') id: string, @CurrentUser() user: IUser) {
        return this.ceremonyService.status(id, activeDto, user)
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiParam({ name: 'id' })
    delete(@Param('id') id: string, @CurrentUser() user: IUser) {
        return this.ceremonyService.delete(id, user)
    }

   
     
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('staff/:id')
    @ApiConsumes('multipart/form-data')
    @ApiParam({ name: 'id' })
    @UseInterceptors(FileInterceptor('image', UtilityService.imageFileFilter("institute")))
    updateStaffCeremony(@Body() StaffCeremonyDto:StaffCeremonyDto ,@Param('id') id:string,@CurrentUser() user:IUser, @UploadedFile() file:Express.Multer.File){
        return this.ceremonyService.updateStaffCeremony(StaffCeremonyDto,id,user,file);
    }

   
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('staff/status/:id')
    @ApiParam({ name: 'id' })
    statusStaffCeremony(@Body() activeDto: ActiveDto, @Param('id') id: string, @CurrentUser() user: IUser) {
        return this.ceremonyService.statusStaffCeremony(id, activeDto, user)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('staff/:id')
    @ApiParam({ name: 'id' }) 
    getByIdStaffCeremony(@Param('id') id: string) {
        return this.ceremonyService.getByIdStaffCeremony(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('staff/:id')
    @ApiParam({ name: 'id' })
    deleteStaffCeremony(@Param('id') id:string,@CurrentUser() user:IUser){
        return this.ceremonyService.deleteStaffCeremony(id,user)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('staff/excel/verify')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('excel', UtilityService.excelFileFilter()))
    async verifyStaffCeremony(@Body() excelFileDto: ExcelFileDto, @CurrentUser() user: IUser, @UploadedFile() file: Express.Multer.File) {
        return this.ceremonyService.verifyStaffCeremony(file);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('staff/excel/upload')
    async uploadStaffCeremony(@Body() uploadExcelData: UploadExcelData, @CurrentUser() user: IUser) {
        return this.ceremonyService.uploadStaffCeremony(uploadExcelData.data, user);
    }
}