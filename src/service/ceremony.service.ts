import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";
import { CeremonyDto } from "src/dto/ceremony.dto";


@Injectable()
export class CeremonyService{
    constructor(@InjectModel(CeremonyModel.name) private readonly ceremonyModel:Model<CeremonyDocument>){}
    async add(ceremonyDto:CeremonyDto){
        return new this.ceremonyModel({...ceremonyDto}).save();
    }

    async update(ceremonyDto:CeremonyDto,id:string){
        const ceremony = await this.ceremonyModel.findById(id).exec()
        if(!ceremony){
            return new BadRequestException('Ceremony Does not exist')
        }
        return await this.ceremonyModel.findByIdAndUpdate(id,ceremonyDto).exec()
    }

    async delete(id:string){
        const ceremony = await this.ceremonyModel.findById(id).exec()
        if(!ceremony){
            return new BadRequestException('Ceremony Does not exist')
        }
        return await this.ceremonyModel.findByIdAndDelete(id).exec();
    }

    async getAll(){
        return await this.ceremonyModel.find().exec();
    }

    async get(id){
        const ceremony = await this.ceremonyModel.findById(id).exec()
        if(!ceremony){
            return new BadRequestException('Ceremony Does not exist')
        }
        return await this.ceremonyModel.findById(id).exec();
    }
}