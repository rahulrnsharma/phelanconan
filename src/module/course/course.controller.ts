import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CourseDto } from "src/dto/course.dto";
import { CourseService } from "src/service/course.service";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";

@ApiTags('course')
@Controller('course')
export class CourseController{
    constructor(private CourseService:CourseService){}

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('add')
    add(@Body() CourseDto:CourseDto){
      return this.CourseService.add(CourseDto)
    }

    
    @ApiBearerAuth()
    @ApiParam({name:'id'})
    @UseGuards(JwtAuthGuard)
    @Put('update/:id')
    update(@Body() CourseDto:CourseDto,@Param('id') id:string){
      return this.CourseService.update(CourseDto,id)
    }

    @ApiBearerAuth()
    @ApiParam({name:'id'})
    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')
    delete(@Param('id') id:string){
      return this.CourseService.delete(id)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll(){
        return this.CourseService.getAll()
    }
    @ApiBearerAuth()
    @ApiParam({name:'id'})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    get(@Param('id') id:string){
        return this.CourseService.get(id)
    }
}