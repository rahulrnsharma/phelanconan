import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { CeremonyDto, ExcelFileDto, UploadExcelData } from "src/dto/ceremony.dto";
import { SearchDto } from "src/dto/search.dto";
import { IAdmin } from "src/interface/admin.interface";
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
    add(@Body() ceremonyDto: CeremonyDto, @CurrentUser() user: IAdmin) {
        return this.ceremonyService.add(ceremonyDto, user);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('excel/verify')
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('excel', UtilityService.excelFileFilter()))
    async verify(@Body() excelFileDto: ExcelFileDto, @CurrentUser() user: IAdmin, @UploadedFile() file: Express.Multer.File) {
        return this.ceremonyService.verify(file);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('excel/upload')
    async upload(@Body() uploadExcelData: UploadExcelData, @CurrentUser() user: IAdmin) {
        return this.ceremonyService.upload(uploadExcelData.data, user);
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
    @Put(':id')
    @ApiParam({ name: 'id' })
    update(@Body() ceremonyDto: CeremonyDto, @Param('id') id: string, @CurrentUser() user: IAdmin) {
        return this.ceremonyService.update(ceremonyDto, id, user)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @ApiParam({ name: 'id' })
    delete(@Param('id') id: string, @CurrentUser() user: IAdmin) {
        return this.ceremonyService.delete(id, user)
    }
}