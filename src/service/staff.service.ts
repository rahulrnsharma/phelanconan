import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage, Types } from "mongoose";
import { StaffDocument, StaffModel } from "src/Schema/staff.schema";
import { User, UserDocument, UserModel } from "src/Schema/user.schema";
import { StaffDto } from "src/dto/staff.dto";
import { PasswordService } from "./password.service";
import { IUser } from "src/interface/user.interface";
import { ActiveStatusEnum, RoleEnum, UserStatusEnum } from "src/enum/common.enum";
import { SearchDto } from "src/dto/search.dto";
import { UtilityService } from "./utility.service";
import { PaginationResponse } from "src/model/pagination.model";

@Injectable()
export class StaffService {
    constructor(@InjectModel(StaffModel.name) private readonly staffModel: Model<StaffDocument>,
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>) { }

    async create(staffDto: StaffDto) {
        staffDto.password = await PasswordService.hash(staffDto.password);
        const _user = await new this.userModel({ username: staffDto.email.toLowerCase(), password: staffDto.password }).save();
        await new this.staffModel({ user: _user._id, firstName: staffDto.firstName, lastName: staffDto.lastName, email: staffDto.email, institute: new Types.ObjectId(staffDto.institute), countryCode: staffDto.countryCode, phone: staffDto.phone, designation: staffDto.designation }).save();
        return { success: true };
    }

    async delete(id: any, user: IUser) {
        const _doc: User = await this.userModel.findByIdAndUpdate(id, { $set: { isActive: false, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return { success: true };
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }

    async approve(id: any, user: IUser) {
        const _doc: User = await this.userModel.findByIdAndUpdate(id, { $set: { status: UserStatusEnum.APPROVED, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return { success: true };
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }

    async reject(id: any, user: IUser) {
        const _doc: User = await this.userModel.findByIdAndUpdate(id, { $set: { status: UserStatusEnum.REJECT, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return { success: true };
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }

    async getAll(searchDto: SearchDto) {
        let _match: any = { role: RoleEnum.STAFF };
        if (searchDto.status) {
            _match.isActive = searchDto.status == ActiveStatusEnum.ACTIVE;
        }
        let query: PipelineStage[] = [UtilityService.getMatchPipeline(_match)];
        query.push({
            $facet: {
                count: [{ $count: "total" }],
                data: [
                    UtilityService.getSortPipeline('createdAt', 'desc'),
                    UtilityService.getSkipPipeline(searchDto.currentPage, searchDto.pageSize),
                    UtilityService.getLimitPipeline(searchDto.pageSize),
                    UtilityService.getLookupPipeline("staffs", "_id", "user", "staff", [
                        UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1, refno: 1 })]),
                        UtilityService.getUnwindPipeline("institute"),
                        UtilityService.getProjectPipeline({ user: 0, createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 })
                    ]),
                    UtilityService.getUnwindPipeline("staff"),
                    UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, username: 0, password: 0, createdBy: 0, updatedBy: 0 })
                ],
            },
        });
        query.push(UtilityService.getProjectPipeline({
            data: 1,
            count: { $ifNull: [{ $arrayElemAt: ["$count.total", 0] }, 0] }
        }))
        let _res: any[] = await this.userModel.aggregate(query).exec();
        return new PaginationResponse(_res[0].data, _res[0].count, searchDto.currentPage, searchDto.pageSize);
    }
}