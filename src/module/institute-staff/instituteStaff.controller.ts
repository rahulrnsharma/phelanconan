import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiParam, ApiTags } from "@nestjs/swagger";
import { InstituteStaffDto, UpdateInstituteStaffDto } from "src/dto/instituteStaff.dto";
import { SearchDto } from "src/dto/search.dto";
import { JwtAuthGuard } from "src/service/guard/jwt-auth.guard";
import { InstituteStaffService } from "src/service/instituteStaff.service";

@ApiTags('Institute Staff')
@Controller('institute-staff')
export class InstituteStaffController {
    constructor(private instituteStaffService: InstituteStaffService) { }


    @Post('register')
    register(@Body() instituteStaffDto: InstituteStaffDto) {
        return this.instituteStaffService.register(instituteStaffDto)
    }
    
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Post('update')
    @ApiParam({ name: 'id' })
    update(@Body() updateInstituteStaffDto: UpdateInstituteStaffDto, @Param('id') id: string) {
        return this.instituteStaffService.update(id, updateInstituteStaffDto);
    }

    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Delete('delete')
    @ApiParam({ name: 'id' })
    delete(@Param('id') id: string) {
        return this.instituteStaffService.delete(id);
    }
    
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Post('get-faculties/:id')
    @ApiParam({ name: 'id' })
    getFaculties(@Param('id') id: string){
        return this.instituteStaffService.getFaculties(id)
    }

     // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    @Post('get-courses/:id')
    @ApiParam({ name: 'id' })
    getCourses(@Param('id') id: string){
        return this.instituteStaffService.getCourse(id)
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('getAll')
    getAll(@Query() searchDto: SearchDto) {
        return this.instituteStaffService.getAll(searchDto)
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiParam({ name: 'id' })
    @Get(':id')
    getById(@Param('id') id: string) {
        return this.instituteStaffService.getById(id);
    }
}