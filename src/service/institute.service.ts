import { BadRequestException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { InstituteDocument, InstituteModel } from "src/Schema/institute.schema";
import { InstituteDto } from "src/dto/institute.dto";
import { IAdmin } from "src/interface/admin.interface";

export class InstituteService{
    constructor(@InjectModel(InstituteModel.name) private instituteModel:Model<InstituteDocument>){}

    async add(instituteDto:InstituteDto,admin:IAdmin){
        const institute = await this.instituteModel.findOne({name:instituteDto.institute,code:instituteDto.code}).exec()
        if(institute){
            return new BadRequestException('Institute already exist')
        }
        return await new this.instituteModel({...instituteDto}).save()
    }

    async update(instituteDto:InstituteDto,id:string){
         const institute = await this.instituteModel.findById(id);
         if(!institute){
            return await new this.instituteModel({...instituteDto}).save()
         }
         return await this.instituteModel.findByIdAndUpdate(id,instituteDto).exec()
    }

    async delete(id:string){
        const institute = await this.instituteModel.findById(id);
        if(!institute){
            return new BadRequestException('Institute Does Not exist')
        }
        return await this.instituteModel.findByIdAndDelete(id)
    }

    async getAll(){
        return await this.instituteModel.find().exec();
    }

    async get(id:string){
        const institute = await this.instituteModel.findById(id)
        if (!institute) {
            return new BadRequestException('Institute Does Not exist');
        }
        return institute;
    }
}