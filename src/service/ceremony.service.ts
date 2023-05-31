import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Ceremony, CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";
import { CeremonyDto } from "src/dto/ceremony.dto";
import { IAdmin } from "src/interface/admin.interface";
var XLSX = require("xlsx");

@Injectable()
export class CeremonyService {
    constructor(@InjectModel(CeremonyModel.name) private readonly ceremonyModel: Model<CeremonyDocument>) { }
    async add(ceremonyDto: CeremonyDto, user: IAdmin) {
        return new this.ceremonyModel({ ...ceremonyDto, createdBy: user.userId }).save();
    }

    async update(ceremonyDto: CeremonyDto, id: string, user: IAdmin) {
        const _doc: Ceremony = await this.ceremonyModel.findByIdAndUpdate(id, { $set: { ...ceremonyDto, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }

    async delete(id: string, user: IAdmin) {
        const _doc: Ceremony = await this.ceremonyModel.findByIdAndUpdate(id, { $set: { isActive: false, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }

    async getAll() {
        return this.ceremonyModel.find().exec();
    }

    async getById(id: any) {
        return this.ceremonyModel.findById(id);
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

