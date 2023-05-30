import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CeremonyModel } from "src/Schema/ceremony.schema";
import { CeremonyDto } from "src/dto/ceremony.dto";



@Injectable()
export class DropdownService{
    constructor(@InjectModel(CeremonyModel.name) private ceremonyModel:Model<CeremonyDto>){}

    async getInstitute(){
        return this.ceremonyModel.aggregate([
            {
                $group: {
                    _id: "$institute"
                 }
             },
            {
            $lookup:{
                from:'institutes',
                as:"institutes",
                localField:"_id",
                foreignField:"_id"
            }
        },
        {
            $unwind:"$institutes"
        },
        {
            $project:{name:"$institutes.name",id:"$institutes._id","_id":0}
        }
    ]);

    }
    
    async getFaculty(instituteId,dateValue,timeValue){
        return  this.ceremonyModel.aggregate([
            {
                $match:{institute:new Types.ObjectId(instituteId),date:new Date(dateValue),time:timeValue}
            },
            {
                $lookup:{
                    from:'faculties',
                    as:'faculties',
                    localField:'institute',
                    foreignField:'institute'
                }
            },
            {
                $unwind:"$faculties"
            },{
                $group:{_id:"$faculties._id",name:{$first:"$faculties.name"}}
            },
            {
                $project:{_id:0,name:1,id:"$_id"}
            }
            ]);
        }
        
        async getCourse(instituteId,dateValue,timeValue,facultyId){
            return  this.ceremonyModel.aggregate([
                {
                    $match:{institute:new Types.ObjectId(instituteId),date:new Date(dateValue),time:timeValue,faculty:new Types.ObjectId(facultyId)}
                },
                {
                    $lookup:{
                        from:'courses',
                        as:'courses',
                        localField:'faculty',
                        foreignField:'faculty'
                    }
                },
                {
                    $unwind:"$courses"
                },
                {
                    $group:{_id:"$courses._id",name:{$first:"$courses.name"}}
                },{
                    $project:{_id:0,name:1,id:"$_id"}
                }

            ]);
        }
        

           async getTime(instituteId,dateValue){
            
               return this.ceremonyModel.aggregate([{$match:{institute:new Types.ObjectId(instituteId),date:new Date(dateValue)}},
                {
                $project:{time:"$time",_id:0}
               }
            ]);
            }


            async getDate(insituteId){
                return this.ceremonyModel.aggregate([
                    {
                        $match:{institute:new Types.ObjectId(insituteId)}
                    },
                    {
                        $project:{date:"$date",_id:0}
                    }

                ])
            }

    
} 