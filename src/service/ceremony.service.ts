import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, PipelineStage } from "mongoose";
import { Ceremony, CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";
import { CeremonyDto } from "src/dto/ceremony.dto";
import { IAdmin } from "src/interface/admin.interface";
import { UtilityService } from "./utility.service";
import { InstituteDocument, InstituteModel } from "src/Schema/institute.schema";
import { CourseDocument, CourseModel } from "src/Schema/course.schema";
import { FacultyDocument, FacultyModel } from "src/Schema/faculty.schema";

@Injectable()
export class CeremonyService {
    constructor(@InjectModel(CeremonyModel.name) private readonly ceremonyModel: Model<CeremonyDocument>,
        @InjectModel(InstituteModel.name) private readonly instituteModel: Model<InstituteDocument>,
        @InjectModel(CourseModel.name) private readonly courseModel: Model<CourseDocument>,
        @InjectModel(FacultyModel.name) private readonly facultyModel: Model<FacultyDocument>
    ) { }
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
        let query: PipelineStage[] = [
            { $match: { isActive: true } },
            {
                $lookup: {
                    from: "institutes",
                    localField: "institute",
                    foreignField: "_id",
                    pipeline: [{ $project: { name: 1 } }],
                    as: "institute"
                }
            },
            {
                $lookup: {
                    from: "faculties",
                    localField: "faculty",
                    foreignField: "_id",
                    pipeline: [{ $project: { name: 1 } }],
                    as: "faculty"
                }
            },
            {
                $lookup: {
                    from: "courses",
                    localField: "course",
                    foreignField: "_id",
                    pipeline: [{ $project: { name: 1 } }],
                    as: "course"
                }
            },
            {
                $unwind: {
                    path: "$institute",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$faculty",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$course",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]
        return this.ceremonyModel.aggregate(query).exec();
    }

    async getById(id: any) {
        return this.ceremonyModel.findById(id);
    }
    async verify(file: any) {
        let _data: any[] = UtilityService.readExcelFileData(file);
        const _header = ["Institution", "Price", "Graduation Date", "Ceremony Time", "Faculty", "Course"];
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
        const _header = ["Institution", "Price", "Graduation Date", "Ceremony Time", "Faculty", "Course", "_institute", "_course", "_faculty"];
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
                    _lastInstitute = new this.instituteModel({ name: data[i]["Institution"], createdBy: user.userId });
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
                    price: data[i]["Price"]
                }).save();
            }
        }
        return { already };
    }
}

