import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model, PipelineStage, Types } from "mongoose";
import { Ceremony, CeremonyDocument, CeremonyModel } from "src/Schema/ceremony.schema";
import { CeremonyDto } from "src/dto/ceremony.dto";
import { IUser } from "src/interface/user.interface";
import { UtilityService } from "./utility.service";
import { InstituteDocument, InstituteModel } from "src/Schema/institute.schema";
import { CourseDocument, CourseModel } from "src/Schema/course.schema";
import { FacultyDocument, FacultyModel } from "src/Schema/faculty.schema";
import { SearchDto } from "src/dto/search.dto";
import { ActiveStatusEnum } from "src/enum/common.enum";
import { PaginationResponse } from "src/model/pagination.model";
import { ActiveDto } from "src/dto/pagination.dto";
import { StaffCeremony, StaffCeremonyDocument, StaffCeremonyModel } from "src/Schema/staff-ceremony.schema";
import { StaffCeremonyDto } from "src/dto/staff-ceremony.dto";

@Injectable()
export class CeremonyService {
    constructor(@InjectModel(CeremonyModel.name) private readonly ceremonyModel: Model<CeremonyDocument>,
        @InjectModel(InstituteModel.name) private readonly instituteModel: Model<InstituteDocument>,
        @InjectModel(CourseModel.name) private readonly courseModel: Model<CourseDocument>,
        @InjectModel(FacultyModel.name) private readonly facultyModel: Model<FacultyDocument>,
        @InjectModel(StaffCeremonyModel.name) private readonly staffGradutionModel: Model<StaffCeremonyDocument>
    ) { }
    async add(ceremonyDto: CeremonyDto, user: IUser, image: Express.Multer.File) {
        if (!mongoose.isValidObjectId(ceremonyDto.institute)) {
            let _lastInstitute = await this.instituteModel.findOne({ name: ceremonyDto.institute.trim() });
            if (!_lastInstitute) {
                let _data = {
                    name: ceremonyDto.institute,
                    price: ceremonyDto.price,
                    refno: ceremonyDto.refno
                }
                if (image) {
                    _data['image'] = image.filename;
                }
                _lastInstitute = await new this.instituteModel({ ..._data, createdBy: user.userId }).save();
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
        let _data = {
            institute: new Types.ObjectId(ceremonyDto.institute),
            faculty: new Types.ObjectId(ceremonyDto.faculty),
            course: new Types.ObjectId(ceremonyDto.course),
            price: ceremonyDto.price,
            date: ceremonyDto.date,
            time: ceremonyDto.time,
            refno: ceremonyDto.refno,
            collectionLocation: ceremonyDto.collectionLocation,
            collectionTime: ceremonyDto.collectionTime,
            cap: ceremonyDto.cap,
            returnLocation: ceremonyDto.returnLocation,
            deadline: ceremonyDto.deadline
        }
        if (image) {
            _data['image'] = image.filename;
            this.instituteModel.findByIdAndUpdate(new Types.ObjectId(ceremonyDto.institute), {
                $push: {
                    gallery: {
                        image: image.filename
                    }
                },
                updatedBy: user.userId
            }, { runValidators: true }).exec();
        }
        return new this.ceremonyModel({ ..._data, createdBy: user.userId }).save();
    }

    async update(ceremonyDto: CeremonyDto, id: string, user: IUser, image: Express.Multer.File) {
        if (!mongoose.isValidObjectId(ceremonyDto.institute)) {
            let _lastInstitute = await this.instituteModel.findOne({ name: ceremonyDto.institute.trim() });
            if (!_lastInstitute) {
                let _data = {
                    name: ceremonyDto.institute,
                    price: ceremonyDto.price,
                    refno: ceremonyDto.refno
                }
                if (image) {
                    _data['image'] = image.filename;
                }
                _lastInstitute = await new this.instituteModel({ ..._data, createdBy: user.userId }).save();
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
        let _data = {
            institute: new Types.ObjectId(ceremonyDto.institute),
            faculty: new Types.ObjectId(ceremonyDto.faculty),
            course: new Types.ObjectId(ceremonyDto.course),
            price: ceremonyDto.price,
            date: ceremonyDto.date,
            time: ceremonyDto.time,
            refno: ceremonyDto.refno,
            collectionLocation: ceremonyDto.collectionLocation,
            collectionTime: ceremonyDto.collectionTime,
            cap: ceremonyDto.cap,
            returnLocation: ceremonyDto.returnLocation,
            deadline: ceremonyDto.deadline
        }
        if (image) {
            _data['image'] = image.filename;
            this.instituteModel.findByIdAndUpdate(new Types.ObjectId(ceremonyDto.institute), {
                $push: {
                    gallery: {
                        image: image.filename
                    }
                },
                updatedBy: user.userId
            }, { runValidators: true }).exec();
        }
        const _doc: Ceremony = await this.ceremonyModel.findByIdAndUpdate(id, { $set: { ..._data, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }

    async delete(id: string, user: IUser) {
        const _doc: Ceremony = await this.ceremonyModel.findByIdAndDelete(id).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }
    async status(id: string, activeDto: ActiveDto, user: IUser) {
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
                    UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1, refno: 1, image: 1 })]),
                    UtilityService.getLookupPipeline("faculties", "faculty", "_id", "faculty", [UtilityService.getProjectPipeline({ name: 1 })]),
                    UtilityService.getLookupPipeline("courses", "course", "_id", "course", [UtilityService.getProjectPipeline({ name: 1 })]),
                    UtilityService.getUnwindPipeline("institute"),
                    UtilityService.getUnwindPipeline("faculty"),
                    UtilityService.getUnwindPipeline("course"),
                    UtilityService.getAddImageFieldPipeline('image', 'phelanconan/institute', { $ifNull: ['$image', '$institute.image'] }),
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
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ _id: new Types.ObjectId(id) })];
        query.push(UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1, refno: 1 })]));
        query.push(UtilityService.getLookupPipeline("faculties", "faculty", "_id", "faculty", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getLookupPipeline("courses", "course", "_id", "course", [UtilityService.getProjectPipeline({ name: 1 })]));
        query.push(UtilityService.getUnwindPipeline("institute"));
        query.push(UtilityService.getUnwindPipeline("faculty"));
        query.push(UtilityService.getUnwindPipeline("course"));
        query.push(UtilityService.getAddImageFieldPipeline('image', 'phelanconan/institute', '$image'));
        query.push(UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 }));
        let _res: any[] = await this.ceremonyModel.aggregate(query).exec();
        return _res[0];
    }
    async verify(file: any) {
        let _data: any[] = UtilityService.readExcelFileData(file);
        if (_data.length == 0) {
            throw new BadRequestException(`Uploaded sheet is empty.`)
        }
        const _header = ["Institution", "Price", "Reference No", "Graduation Date", "Ceremony Time", "Faculty", "Course", "Image", "Collection Location", "Collection Time", "Cap", "Return Location", "Deadline"];
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
            if (!isNaN(_obj["Collection Time"])) {
                _obj["Collection Time"] = UtilityService.excelTime(_obj["Collection Time"]);
            }
            if (!isNaN(_obj["Deadline"])) {
                _obj["Deadline"] = UtilityService.excelDate(_obj["Deadline"], offset);
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
                        time: _obj["Ceremony Time"]
                        // price: _obj["Price"],
                        // refno: _obj["Reference No"]
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
    async upload(data: any[], user: IUser) {
        const _header = ["Institution", "Price", "Reference No", "Graduation Date", "Ceremony Time", "Faculty", "Course", "Image", "Collection Location", "Collection Time", "Cap", "Return Location", "Deadline", "_institute", "_course", "_faculty"];
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
                    _lastInstitute = new this.instituteModel({ name: data[i]["Institution"], price: data[i]["Price"], refno: data[i]["Reference No"], createdBy: user.userId });
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
                refno: data[i]["Reference No"],
                date: data[i]["Graduation Date"],
                // time: data[i]["Ceremony Time"],
                // price: data[i]["Price"]

            })
            if (_ceremony) {
                already.push({ real: data[i], indb: _ceremony, index: i });
            }
            else {
                let _cap = data[i]["Cap"].toString().toLowerCase().trim();
                await new this.ceremonyModel({
                    institute: _lastInstitute._id,
                    faculty: _lastFaculty._id,
                    course: _lastCourse._id,
                    refno: data[i]["Reference No"],
                    date: data[i]["Graduation Date"],
                    time: data[i]["Ceremony Time"],
                    price: data[i]["Price"],
                    image: data[i]["Image"],
                    collectionLocation: data[i]["Collection Location"],
                    collectionTime: data[i]["Collection Time"],
                    cap: _cap == 'yes' || _cap == 'true',
                    returnLocation: data[i]["Return Location"],
                    deadline: data[i]["Deadline"]
                }).save();
            }
        }
        return { already };
    }

    async addStaffCeremony(staffCeremonyDto: StaffCeremonyDto, user: IUser, image: Express.Multer.File) {
        if (!mongoose.isValidObjectId(staffCeremonyDto.institute)) {
            let _lastInstitute = await this.instituteModel.findOne({ name: staffCeremonyDto.institute.trim() });
            if (!_lastInstitute) {
                let _data = {
                    name: staffCeremonyDto.institute,
                    refno: staffCeremonyDto.refno,
                    price: 0
                }
                if (image) {
                    _data['image'] = image.filename;
                }
                _lastInstitute = await new this.instituteModel({ ..._data, createdBy: user.userId }).save();
            }
            staffCeremonyDto.institute = _lastInstitute._id.toString();
        }
        let _data = {
            institute: new Types.ObjectId(staffCeremonyDto.institute),
            date: staffCeremonyDto.date,
            time: staffCeremonyDto.time,
            duration: staffCeremonyDto.duration,
            refno: staffCeremonyDto.refno,
            price: 0,
            deadline: staffCeremonyDto.deadline

        }
        if (image) {
            _data['image'] = image.filename;
            this.instituteModel.findByIdAndUpdate(new Types.ObjectId(staffCeremonyDto.institute), {
                $push: {
                    gallery: {
                        image: image.filename
                    }
                },
                updatedBy: user.userId
            }, { runValidators: true }).exec();
        }
        return new this.staffGradutionModel({ ..._data, createdBy: user.userId }).save();
    }
    async updateStaffCeremony(staffCeremonyDto: StaffCeremonyDto, id: string, user: IUser, image: Express.Multer.File) {
        if (!mongoose.isValidObjectId(staffCeremonyDto.institute)) {
            let _lastInstitute = await this.instituteModel.findOne({ name: staffCeremonyDto.institute.trim() });
            if (!_lastInstitute) {
                let _data = {
                    name: staffCeremonyDto.institute,
                    refno: staffCeremonyDto.refno,
                    price: 0
                }
                if (image) {
                    _data['image'] = image.filename;
                }
                _lastInstitute = await new this.instituteModel({ ..._data, createdBy: user.userId }).save();
            }
            staffCeremonyDto.institute = _lastInstitute._id.toString();
        }
        let _data = {
            institute: new Types.ObjectId(staffCeremonyDto.institute),
            date: staffCeremonyDto.date,
            time: staffCeremonyDto.time,
            duration: staffCeremonyDto.duration,
            refno: staffCeremonyDto.refno,
            price: 0,
            deadline: staffCeremonyDto.deadline
        }
        if (image) {
            _data['image'] = image.filename;
            this.instituteModel.findByIdAndUpdate(new Types.ObjectId(staffCeremonyDto.institute), {
                $push: {
                    gallery: {
                        image: image.filename
                    }
                },
                updatedBy: user.userId
            }, { runValidators: true }).exec();
        }
        const _doc: StaffCeremony = await this.staffGradutionModel.findByIdAndUpdate(id, { $set: { ..._data, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }
    async deleteStaffCeremony(id: string, user: IUser) {
        const _doc: StaffCeremony = await this.staffGradutionModel.findByIdAndDelete(id).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are delete does not exist.");
        }
    }
    async getAllStaffCeremony(searchDto: SearchDto) {
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
                    UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1, refno: 1, image: 1 })]),
                    UtilityService.getUnwindPipeline("institute"),
                    UtilityService.getAddImageFieldPipeline('image', 'phelanconan/institute', { $ifNull: ['$image', '$institute.image'] }),
                    UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 })
                ],
            },
        });
        query.push(UtilityService.getProjectPipeline({
            data: 1,
            count: { $ifNull: [{ $arrayElemAt: ["$count.total", 0] }, 0] }
        }))
        let _res: any[] = await this.staffGradutionModel.aggregate(query).exec();
        return new PaginationResponse(_res[0].data, _res[0].count, searchDto.currentPage, searchDto.pageSize);
    }
    async getByIdStaffCeremony(id: any) {
        let query: PipelineStage[] = [UtilityService.getMatchPipeline({ _id: new Types.ObjectId(id) })];
        query.push(UtilityService.getLookupPipeline("institutes", "institute", "_id", "institute", [UtilityService.getProjectPipeline({ name: 1, refno: 1 })]));
        query.push(UtilityService.getUnwindPipeline("institute"));
        query.push(UtilityService.getAddImageFieldPipeline('image', 'phelanconan/institute', '$image'));
        query.push(UtilityService.getProjectPipeline({ createdAt: 0, updatedAt: 0, createdBy: 0, updatedBy: 0 }));
        let _res: any[] = await this.staffGradutionModel.aggregate(query).exec();
        return _res[0];
    }
    async statusStaffCeremony(id: string, activeDto: ActiveDto, user: IUser) {
        const _doc: StaffCeremony = await this.staffGradutionModel.findByIdAndUpdate(id, { $set: { isActive: activeDto.active, updatedBy: user.userId } }, { new: true, runValidators: true }).exec();
        if (_doc) {
            return _doc;
        }
        else {
            throw new BadRequestException("Resource you are update does not exist.");
        }
    }
    async verifyStaffCeremony(file: any) {
        let _data: any[] = UtilityService.readExcelFileData(file);
        if (_data.length == 0) {
            throw new BadRequestException(`Uploaded sheet is empty.`)
        }
        const _header = ["Institution", "Graduation Date", "Ceremony Time", "Image", "Hire duration", "Reference No", "Deadline"];
        if (!UtilityService.validExcelHeader(_header, _data[0])) {
            throw new BadRequestException(`Excel sheet header should be ${_header}`)
        }
        const offset = new Date(0).getTimezoneOffset();
        const duplicate: any[] = [];
        const already: any[] = [];
        const check: any[] = [];
        const unique: any[] = [];
        const institute = new Set<String>();
        const instituteDb: any[] = [];
        let _lastInstitute: any;
        for (let i = 0; i < _data.length; i++) {
            let _obj = _data[i];
            if (!isNaN(_obj["Graduation Date"])) {
                _obj["Graduation Date"] = UtilityService.excelDate(_obj["Graduation Date"], offset);
            }
            if (!isNaN(_obj["Ceremony Time"])) {
                _obj["Ceremony Time"] = UtilityService.excelTime(_obj["Ceremony Time"]);
            }
            if (!isNaN(_obj["Deadline"])) {
                _obj["Deadline"] = UtilityService.excelDate(_obj["Deadline"], offset);
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
                _obj["_institute"] = _lastInstitute;
                if (_lastInstitute) {
                    let _StaffCeremony = await this.staffGradutionModel.findOne({
                        institute: _lastInstitute._id,
                        date: _obj["Graduation Date"],
                        time: _obj["Ceremony Time"],
                        duration: _obj["Hire duration"],
                        // refno: _obj["Reference No"]
                    })
                    if (_StaffCeremony) {
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
    async uploadStaffCeremony(data: any[], user: IUser) {
        const _header = ["Institution", "Graduation Date", "Ceremony Time", "Image", "Hire duration", "Reference No", "Deadline", "_institute"];
        if (!UtilityService.validExcelHeader(_header, data[0])) {
            throw new BadRequestException(`Not a valid Data`);
        }
        const institute = new Set<String>()
        let _lastInstitute: any;
        const already: any[] = [];
        for (let i = 0; i < data.length; i++) {
            if (!institute.has(data[i]["Institution"])) {
                if (data[i]["_institute"]) {
                    _lastInstitute = data[i]["_institute"];
                }
                else {
                    _lastInstitute = new this.instituteModel({ name: data[i]["Institution"], refno: data[i]["Reference No"], price: 0, createdBy: user.userId });
                    await _lastInstitute.save();
                }
                institute.add(data[i]["Institution"]);
            }
            else if (_lastInstitute.name != data[i]["Institution"]) {
                _lastInstitute = data[i]["_institute"] || await this.instituteModel.findOne({ name: data[i]["Institution"] });
            }
            let _StaffCeremony = await this.staffGradutionModel.findOne({
                institute: _lastInstitute._id,
                date: data[i]["Graduation Date"],
                time: data[i]["Ceremony Time"],
                duration: data[i]["Hire duration"],
                // refno: data[i]["Reference No"]

            })
            if (_StaffCeremony) {
                already.push({ real: data[i], indb: _StaffCeremony, index: i });
            }
            else {
                await new this.staffGradutionModel({
                    institute: _lastInstitute._id,
                    date: data[i]["Graduation Date"],
                    time: data[i]["Ceremony Time"],
                    duration: data[i]["Hire duartion"],
                    image: data[i]["Image"],
                    refno: data[i]["Reference No"],
                    deadline: data[i]["Deadline"],
                    price: 0
                }).save();

            }
        }
        return { already };
    }
    async getStudentCeremonySample() {
        return UtilityService.getStudentCeremonySample();
    }
    async getStaffCeremonySample() {
        return UtilityService.getStaffCeremonySample();
    }
}

