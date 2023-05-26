import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { InstituteDto } from "src/dto/institute.dto";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { InstituteService } from "src/service/institute.service";

@ApiTags('institute')
@Controller('institute')
export class InstituteController{
  constructor(private instituteService:InstituteService){}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('add')
  add(@Body() instituteDto:InstituteDto){
    return this.instituteService.add(instituteDto) 
  }

  
  @ApiBearerAuth()
  @ApiParam({name:'id'})
  @UseGuards(JwtAuthGuard)
  @Put('update/:id')
  update(@Body() instituteDto:InstituteDto,@Param('id') id:string){
    return this.instituteService.update(instituteDto,id)
  }

  @ApiBearerAuth()
  @ApiParam({name:'id'})
  @UseGuards(JwtAuthGuard)
  @Delete('delete/:id')
  delete(@Param('id') id:string){
    return this.instituteService.delete(id)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('')
  getAll(){
      return this.instituteService.getAll()
  }
  @ApiBearerAuth()
  @ApiParam({name:'id'})
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  get(@Param('id') id:string){
      return this.instituteService.get(id)
  }
}
