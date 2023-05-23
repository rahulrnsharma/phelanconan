import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { CourseDto } from "src/dto/course.dto";
import { IAdmin } from "src/interface/admin.interface";
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

    
    // @ApiBearerAuth()
    @ApiParam({name:'id'})
    // @UseGuards(JwtAuthGuard)
    @Post('update/:id')
    update(@Body() CourseDto:CourseDto,@Param('id') id:string){
      return this.CourseService.update(CourseDto,id)
    }

    // @ApiBearerAuth()
    @ApiParam({name:'id'})
    // @UseGuards(JwtAuthGuard)
    @Post('delete/:id')
    delete(@Param('id') id:string){
      return this.CourseService.delete(id)
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Get('')
    getAll(){
        return this.CourseService.getAll()
    }
    // @ApiBearerAuth()
    @ApiParam({name:'id'})
    // @UseGuards(JwtAuthGuard)
    @Get(':id')
    get(@Param('id') id:string){
        return this.CourseService.get(id)
    }
}