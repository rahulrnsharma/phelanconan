import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, PipelineStage, Types } from "mongoose";
import { Ceremony, CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";
import { CeremonyDto } from "src/dto/ceremony.dto";
import { IAdmin } from "src/interface/admin.interface";
import { UtilityService } from "./utility.service";
import { InstituteDocument, InstituteModel } from "src/Schema/institute.schema";
import { CourseDocument, CourseModel } from "src/Schema/course.schema";
import { FacultyDocument, FacultyModel } from "src/Schema/faculty.schema";
import { SearchDto } from "src/dto/search.dto";
import { ActiveStatusEnum } from "src/enum/common.enum";
import { PaginationResponse } from "src/model/pagination.model";
import { ActiveDto } from "src/dto/pagination.dto";

@Injectable()
export class CeremonyService {
    constructor(@InjectModel(CeremonyModel.name) private readonly ceremonyModel: Model<CeremonyDocument>,
        @InjectModel(InstituteModel.name) private readonly instituteModel: Model<InstituteDocument>,
        @InjectModel(CourseModel.name) private readonly courseModel: Model<CourseDocument>,
        @InjectModel(FacultyModel.name) private readonly facultyModel: Model<FacultyDocument>
    ) { }
    async add(ceremonyDto: CeremonyDto, user: IAdmin) {
        if (!mongoose.isValidObjectId(ceremonyDto.institute)) {
            let _lastInstitute = await this.instituteModel.findOne({ name: ceremonyDto.institute.trim() });
            if (!_lastInstitute) {
                _lastInstitute = await new this.instituteModel({ name: ceremonyDto.institute, price: ceremonyDto.price, createdBy: user.userId }).save();
            }
            ceremonyDto.institute = _lastInstitute._id.toString();
        }
        if (!mongoose.isValidObjectId(ceremonyDto.course)) {
            let _lastCourse = await this.courseModel.findOne({ name: ceremonyDto.course.trim() });
            if (!_lastCourse) {
                _lastCourse = await new this.courseModel({ name: ceremonyDto.course, createdBy: user.userId }).save();
            }
            ceremonyDto.course = _lastCourse._id.toString();
        }
        if (!mongoose.isValidObjectId(ceremonyDto.faculty)) {
            let _lastFaculty = await this.facultyModel.findOne({ name: ceremonyDto.faculty.trim() });
            if (!_lastFaculty) {
                _lastFaculty = await new this.facultyModel({ name: ceremonyDto.faculty, createdBy: user.userId }).save();
            }
            ceremonyDto.faculty = _lastFaculty._id.toString();
        }
        return new this.ceremonyModel({ institute: new Types.ObjectId(ceremonyDto.institute), faculty: new Types.ObjectId(ceremonyDto.faculty), course: new Types.ObjectId(ceremonyDto.course), price: ceremonyDto.price, date: ceremonyDto.date, time: ceremonyDto.time, createdBy: user.userId }).save();
    }

    async update(ceremonyDto: CeremonyDto, id: string, user: IAdmin) {
        if (!mongoose.isValidObjectId(ceremonyDto.institute)) {
            let _lastInstitute = await this.instituteModel.findOne({ name: ceremonyDto.institute.trim() });
            if (!_lastInstitute) {
                _lastInstitute = await new this.instituteModel({ name: ceremonyDto.institute, price: ceremonyDto.price, createdBy: user.userId }).save();
            }
            ceremonyDto.institute = _lastInstitute._id.toString();
        }
        if (!mongoose.isValidObjectId(ceremonyDto.course)) {
            let _lastCourse = await this.courseModel.findOne({ name: ceremonyDto.course.trim() });
            if (!_lastCourse) {
                _lastCourse = await new this.courseModel({ name: ceremonyDto.course, createdBy: user.userId }).save();
            }
            ceremonyDto.course = _lastCourse._id.toString();
        }
        if (!mongoose.isValidObjectId(ceremonyDto.faculty)) {
            let _lastFaculty = await this.facultyModel.findOne({ name: ceremonyDto.faculty.trim() });
            if (!_lastFaculty) {
                _lastFaculty = await new this.facultyModel({ name: ceremonyDto.faculty, createdBy: user.userId }).save();
            }
            ceremonyDto.faculty = _lastFaculty._id.toString();
        }
        const _doc: Ceremony = await this.ceremonyModel.findByIdAndUpdate(id, { $set: { institute: new Types.ObjectId(ceremonyDto.institute), faculty: new Types.ObjectId(ceremonyDto.faculty), course: new Types.ObjectId(ceremonyDto.course), price: ceremonyDto.price, date: ceremonyDto.date, time: ceremonyDto.time, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
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
    async status(id: string, activeDto: ActiveDto, user: IAdmin) {
        const _doc: Ceremony = await this.ceremonyModel.findByIdAndUpdate(id, { $set: { isActive: activeDto.active, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }

    async getAll(searchDto: SearchDto) {
        let _match: any = {};
        if (searchDto.status) {
            _match.isActive = searchDto.status == ActiveStatusEnum.ACTIVE;
        }
        // if (searchDto.search) {
        //     _match.name = {
        //         $regex: new RegExp(`${searchDto.search}`, "ig"),
        //     }
        // }
        let query: PipelineStage[] = [UtilityService.getMatchPipeline(_match)];
        query.push({
            $facet: {
                count: [{ $count: "total" }],
                data: [
                    UtilityService.getSortPipeline('createdAt', 'desc'),
                    UtilityService.getSkipPipeline(searchDto.currentPage, searchDto.pageSize),
                    UtilityService.getLimitPipeline(searchDto.pageSize),
                    UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1 })]),
                    UtilityService.getLookupPipeline("faculties", "faculty", "_id", "faculty", [UtilityService.getProjectPipeline({ name: 1 })]),
                    UtilityService.getLookupPipeline("courses", "course", "_id", "course", [UtilityService.getProjectPipeline({ name: 1 })]),
                    UtilityService.getUnwindPipeline("institute"),
                    UtilityService.getUnwindPipeline("faculty"),
                    UtilityService.getUnwindPipeline("course"),
                    UtilityService.getAddImageFieldPipeline('image', 'phelanconan/institute', '$image'),
                    UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 })
                ],
            },
        });
        query.push(UtilityService.getProjectPipeline({
            data: 1,
            count: { $ifNull: [{ $arrayElemAt: ["$count.total", 0] }, 0] }
        }))
        let _res: any[] = await this.ceremonyModel.aggregate(query).exec();
        return new PaginationResponse(_res[0].data, _res[0].count, searchDto.currentPage, searchDto.pageSize);
    }

    async getById(id: any) {
        return this.ceremonyModel.findById(id);
    }
    async verify(file: any) {
        let _data: any[] = UtilityService.readExcelFileData(file);
        const _header = ["Institution", "Price", "Graduation Date", "Ceremony Time", "Faculty", "Course", "Image"];
        if (!UtilityService.validExcelHeader(_header, _data[0])) {
            throw new BadRequestException(`Excel sheet header should be ${_header}`)
        }
        const offset = new Date(0).getTimezoneOffset();
        const duplicate: any[] = [];
        const already: any[] = [];
        const check: any[] = [];
        const unique: any[] = [];
        const institute = new Set<String>();
        const course = new Set<String>();
        const faculty = new Set<String>();
        const instituteDb: any[] = [];
        const courseDb: any[] = [];
        const facultyDb: any[] = [];
        let _lastInstitute: any;
        let _lastCourse: any;
        let _lastFaculty: any;
        for (let i = 0; i < _data.length; i++) {
            let _obj = _data[i];
            if (!isNaN(_obj["Graduation Date"])) {
                _obj["Graduation Date"] = UtilityService.excelDate(_obj["Graduation Date"], offset);
            }
            if (!isNaN(_obj["Ceremony Time"])) {
                _obj["Ceremony Time"] = UtilityService.excelTime(_obj["Ceremony Time"]);
            }
            const _duplicate = check.find(
                (uniqueObj) => JSON.stringify(uniqueObj) == JSON.stringify(_obj)
            );
            if (!_duplicate) {
                check.push({ ..._obj });
                if (!institute.has(_obj["Institution"])) {
                    _lastInstitute = await this.instituteModel.findOne({ name: _obj["Institution"].trim() }, { name: 1 });
                    institute.add(_obj["Institution"]);
                    if (_lastInstitute) {
                        instituteDb.push(_lastInstitute)
                    }
                }
                else if (_lastInstitute?.name != _obj["Institution"]) {
                    _lastInstitute = instituteDb.find((ele) => ele.name == _obj["Institution"]);
                }
                if (!course.has(_obj["Course"])) {
                    _lastCourse = await this.courseModel.findOne({ name: _obj["Course"] }, { name: 1 });
                    course.add(_obj["Course"]);
                    if (_lastCourse) {
                        courseDb.push(_lastCourse)
                    }
                }
                else if (_lastCourse?.name != _obj["Course"]) {
                    _lastCourse = courseDb.find((ele) => ele.name == _obj["Course"]);
                }
                if (!faculty.has(_obj["Faculty"])) {
                    _lastFaculty = await this.facultyModel.findOne({ name: _obj["Faculty"] }, { name: 1 });
                    faculty.add(_obj["Faculty"]);
                    if (_lastFaculty) {
                        facultyDb.push(_lastFaculty)
                    }
                }
                else if (_lastFaculty?.name != _obj["Faculty"]) {
                    _lastFaculty = facultyDb.find((ele) => ele.name == _obj["Faculty"]);
                }
                _obj["_institute"] = _lastInstitute;
                _obj["_course"] = _lastCourse;
                _obj["_faculty"] = _lastFaculty;
                if (_lastInstitute && _lastCourse && _lastFaculty) {
                    let _ceremony = await this.ceremonyModel.findOne({
                        institute: _lastInstitute._id,
                        faculty: _lastFaculty._id,
                        course: _lastCourse._id,
                        date: _obj["Graduation Date"],
                        time: _obj["Ceremony Time"],
                        price: _obj["Price"]
                    })
                    if (_ceremony) {
                        already.push({ ..._obj, rows: i + 2 });
                    }
                    else {
                        unique.push(_obj);
                    }
                }
                else
                    unique.push(_obj);
            }
            else {
                duplicate.push({ ..._duplicate, rows: i + 2 })
            }
        }
        return { unique, duplicate, already };
    }
    async upload(data: any[], user: IAdmin) {
        const _header = ["Institution", "Price", "Graduation Date", "Ceremony Time", "Faculty", "Course", "Image", "_institute", "_course", "_faculty"];
        if (!UtilityService.validExcelHeader(_header, data[0])) {
            throw new BadRequestException(`Not a valid Data`);
        }
        const institute = new Set<String>();
        const course = new Set<String>();
        const faculty = new Set<String>();
        let _lastInstitute: any;
        let _lastCourse: any;
        let _lastFaculty: any;
        const already: any[] = [];
        for (let i = 0; i < data.length; i++) {
            if (!institute.has(data[i]["Institution"])) {
                if (data[i]["_institute"]) {
                    _lastInstitute = data[i]["_institute"];
                }
                else {
                    _lastInstitute = new this.instituteModel({ name: data[i]["Institution"], price: data[i]["Price"], createdBy: user.userId });
                    await _lastInstitute.save();
                }
                institute.add(data[i]["Institution"]);
            }
            else if (_lastInstitute.name != data[i]["Institution"]) {
                _lastInstitute = data[i]["_institute"] || await this.instituteModel.findOne({ name: data[i]["Institution"] });
            }
            if (!course.has(data[i]["Course"])) {
                if (data[i]["_course"]) {
                    _lastCourse = data[i]["_course"];
                }
                else {
                    _lastCourse = new this.courseModel({ name: data[i]["Course"], createdBy: user.userId });
                    await _lastCourse.save();
                }
                course.add(data[i]["Course"]);
            }
            else if (_lastCourse.name != data[i]["Course"]) {
                _lastCourse = data[i]["_course"] || await this.courseModel.findOne({ name: data[i]["Course"] });
            }
            if (!faculty.has(data[i]["Faculty"])) {
                if (data[i]["_faculty"]) {
                    _lastFaculty = data[i]["_faculty"];
                }
                else {
                    _lastFaculty = new this.facultyModel({ name: data[i]["Faculty"], createdBy: user.userId });
                    await _lastFaculty.save();
                }
                faculty.add(data[i]["Faculty"]);
            }
            else if (_lastFaculty.name != data[i]["Faculty"]) {
                _lastFaculty = data[i]["_faculty"] || await this.facultyModel.findOne({ name: data[i]["Faculty"] });
            }
            let _ceremony = await this.ceremonyModel.findOne({
                institute: _lastInstitute._id,
                faculty: _lastFaculty._id,
                course: _lastCourse._id,
                date: data[i]["Graduation Date"],
                time: data[i]["Ceremony Time"],
                price: data[i]["Price"]
            })
            if (_ceremony) {
                already.push({ real: data[i], indb: _ceremony, index: i });
            }
            else {
                await new this.ceremonyModel({
                    institute: _lastInstitute._id,
                    faculty: _lastFaculty._id,
                    course: _lastCourse._id,
                    date: data[i]["Graduation Date"],
                    time: data[i]["Ceremony Time"],
                    price: data[i]["Price"],
                    image: data[i]["Image"]
                }).save();
            }
        }
        return { already };
    }
}

