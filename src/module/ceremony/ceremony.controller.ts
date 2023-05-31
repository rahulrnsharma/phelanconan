import { Body, Controller, Delete, Get, Param, Post, Put, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { createReadStream } from "fs";
import { CeremonyDto } from "src/dto/ceremony.dto";
import { CeremonyService } from "src/service/ceremony.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";

@ApiTags('ceremony')
@Controller('ceremony')
export class CeremonyController{
    constructor(private ceremonyService:CeremonyService){}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('add')
    add(@Body() ceremonyDto:CeremonyDto){
        return this.ceremonyService.add(ceremonyDto);
    }

    @ApiBearerAuth()
    @ApiParam({name:'id'})
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    update(@Body() ceremonyDto:CeremonyDto,@Param('id') id:string){
    return this.ceremonyService.update(ceremonyDto,id)
    }

    @ApiBearerAuth()
    @ApiParam({name:'id'})
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    delete(@Param('id') id:string){
        return this.ceremonyService.delete(id)
    }

    @ApiBearerAuth()
    @ApiParam({name:'id'})
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    get(@Param('id') id:string){
        return this.ceremonyService.get(id);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll(){
        return this.ceremonyService.getAll()
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    fileUpload(@UploadedFile() file:Express.Multer.File){
        if (!file) {
            return 'No file uploaded.';
          }
          const data = this.ceremonyService.readExcelFile(file.path);
        //   console.log(this.ceremonyService.importInstitute(file.path))
          console.log(data[0]);
        //   const insertData = this.ceremonyService.addDataFromfile(data)
          return data;
    }
}