import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { FacultyDto } from "src/dto/faculty.dto";
import { FacultyService } from "src/service/faculty.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";


@ApiTags('faculty')
@Controller('faculty')
export class FacultyController{
    constructor(private facultyService:FacultyService){}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('add')
    add(@Body() facultyDto:FacultyDto){
      return this.facultyService.add(facultyDto)
    }

    
    @ApiBearerAuth()
    @ApiParam({name:'id'})
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    update(@Body() facultyDto:FacultyDto,@Param('id') id:string){
      return this.facultyService.update(facultyDto,id)
    }

    @ApiBearerAuth()
    @ApiParam({name:'id'})
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    delete(@Param('id') id:string){
      return this.facultyService.delete(id)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll(){
        return this.facultyService.getAll()
    }
    @ApiBearerAuth()
    @ApiParam({name:'id'})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    get(@Param('id') id:string){
        return this.facultyService.get(id)
    }
}