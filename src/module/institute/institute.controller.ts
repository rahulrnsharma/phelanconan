import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { CurrentUser } from "src/decorator/current-user.decorator";
import { InstituteDto } from "src/dto/institute.dto";
import { IAdmin } from "src/interface/admin.interface";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { InstituteService } from "src/service/institute.service";

@ApiTags('institute')
@Controller('institute')
export class InstituteController{
  constructor(private instituteService:InstituteService){}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('add')
  add(@Body() instituteDto:InstituteDto,@CurrentUser() admin:IAdmin){
    return this.instituteService.add(instituteDto,admin) 
  }

  
  @ApiBearerAuth()
  @ApiParam({name:'id'})
  @UseGuards(JwtAuthGuard)
  @Post('update/:id')
  update(@Body() instituteDto:InstituteDto,@Param('id') id:string){
    return this.instituteService.update(instituteDto,id)
  }

  @ApiBearerAuth()
  @ApiParam({name:'id'})
  @UseGuards(JwtAuthGuard)
  @Post('delete/:id')
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
