import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";
import { CeremonyDto } from "src/dto/ceremony.dto";
var XLSX = require("xlsx");
var excelToJson = require('convert-excel-to-json')



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

    readExcelFile(filePath: string): CeremonyDto[] {
        const workbook = XLSX.readFile(filePath);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const data:CeremonyDto[] = XLSX.utils.sheet_to_json(worksheet, { header: 2 });
        return data;
      }
    // async addDataFromfile(ceremonyDto:CeremonyDto[]){
    //     return new this.ceremonyModel(ceremonyDto).save();
    // }


    // async importInstitute(filePath){
    //     csvtojson({
        
    //     })
    //     const instituteData = excelToJson({
    //         sourceFile: filePath,
    //         sheets:[{
    //             header:{
    //                 rows:1
    //             },
    //             columnToKey:{
    //                 A:'_id'
    //             }
    //         }]
    //     });
    //    return instituteData
    // }


}

