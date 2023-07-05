import { BadRequestException, Injectable } from "@nestjs/common";
import { PipelineStage } from "mongoose";
import { diskStorage } from "multer";
import { SortOrderEnum } from "src/enum/common.enum";
var XLSX = require("xlsx");

@Injectable()
export class UtilityService {
    static ticketNumber = 1;
    static setStartHour(date: Date, timezone: number) {
        const _timezoneDiff = (new Date().getTimezoneOffset()) - timezone;
        date.setHours(0, 0, 0, 0);
        if (_timezoneDiff != 0) {
            date.setHours(date.getHours() - Math.floor(_timezoneDiff / 60));
            date.setMinutes(date.getMinutes() - (_timezoneDiff % 60));
        }
        return date;
    }
    static getOrderNumber(refno: string, count: number) {
        let _y = new Date().getFullYear().toString();
        // let _m = String(new Date().getMonth()).padStart(2, "0");
        // let _d = String(new Date().getDate()).padStart(2, "0");
        // let _hh = String(new Date().getHours()).padStart(2, "0");
        // let _mm = String(new Date().getMinutes()).padStart(2, "0");
        // let _ss = String(new Date().getSeconds()).padStart(2, "0");
        // let _sss = String(new Date().getMilliseconds()).padStart(3, "0");
        return `${_y.substring(2)}-${refno}-${String(count + 1).padStart(4, "0")}`;

    }
    static setEndHour(date: Date, timezone: number) {
        const _timezoneDiff = (new Date().getTimezoneOffset()) - timezone;
        date.setHours(23, 59, 59, 999);
        if (_timezoneDiff != 0) {
            date.setHours(date.getHours() - Math.floor(_timezoneDiff / 60));
            date.setMinutes(date.getMinutes() - (_timezoneDiff % 60));
        }
        return date;
    }
    static getCurrentDateWithTimezone(timezone: number) {
        let _date = new Date();
        const _timezoneDiff = (_date.getTimezoneOffset()) - timezone;
        if (_timezoneDiff != 0) {
            _date.setHours(_date.getHours() - Math.floor(_timezoneDiff / 60));
            _date.setMinutes(_date.getMinutes() - (_timezoneDiff % 60));
        }
        return _date;
    }

    static imageFileFilter(folder: string) {
        let options: any = {
            storage: diskStorage({
                destination: `./public/${folder}`,
                filename: (req, file, cb) => {
                    return cb(null, `${file.originalname}`)
                }
            }),
            fileFilter: (req: any, file: any, cb: any) => {
                if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                    return cb(new Error('Only images are allowed'), false);
                }
                cb(null, true);
            }
        };
        return options
    }
    static excelFileFilter() {
        return {
            fileFilter: (req: any, file: any, cb: any) => {
                if (['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].indexOf(file.mimetype) == -1)
                    cb(new BadRequestException('Only xlsx or xls are allowed.'), false);
                cb(null, true);
            }
        }
    }
    static readExcelFileData(file: any) {
        var workbook = XLSX.read(file.buffer);
        const sheetName = workbook.SheetNames;
        return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName[0]]);
    }
    static excelDate(value: number, offset: number) {
        return new Date(0, 0, value - 1, 0, -offset, 0);
    }
    static excelTime(value: number) {
        let _day = value - Math.floor(value) + 0.0000001;
        let _seconds = Math.floor(86400 * _day);
        let ss = _seconds % 60;
        _seconds -= ss;
        let hh = Math.floor(_seconds / (60 * 60));
        let mm = Math.floor(_seconds / 60) % 60;
        return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:${String(ss).padStart(2, "0")}`;
    }
    static validExcelHeader(shouldBeHeader: any[], excelHeader: any) {
        return shouldBeHeader.sort().join(",") == Object.keys(excelHeader).sort().join(",");
    }
    static groupBy(array: any[], key: any) {
        return array.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }
    static getMatchPipeline(_match: any): PipelineStage.Match {
        return { $match: _match };
    }
    static getSortPipeline(field: string, order: string): PipelineStage.Sort {
        let _sort: any = {};
        _sort[field] = order == SortOrderEnum.ASC ? 1 : -1;
        return { $sort: _sort };
    }
    static getSkipPipeline(page: number, limit: number): PipelineStage.Skip {
        return { $skip: (page - 1) * limit };
    }
    static getLimitPipeline(limit: number): PipelineStage.Limit {
        return { $limit: limit };
    }
    static getUnwindPipeline(path: string, preserveNullAndEmptyArrays: boolean = true): PipelineStage.Unwind {
        return { $unwind: { path: `$${path}`, preserveNullAndEmptyArrays: preserveNullAndEmptyArrays } };
    }
    static getLookupPipeline(from: string, localField: string, foreignField: string, as: string, pipeline: Exclude<PipelineStage, PipelineStage.Merge | PipelineStage.Out>[]): PipelineStage.Lookup {
        return {
            $lookup: {
                from: from,
                localField: localField,
                foreignField: foreignField,
                pipeline: pipeline,
                as: as
            }
        };
    }
    static getProjectPipeline(project: any): PipelineStage.Project {
        return {
            $project: { ...project }
        };
    }
    static getGroupPipeline(group: any): PipelineStage.Group {
        return { $group: { ...group } };
    }
    static getAddImageFieldPipeline(field: string, folder: string, key: any): PipelineStage.AddFields {
        let _addField: any = {};
        _addField[field] = { $concat: [process.env.DOC_BASE_URL, `${folder}/`, key] };
        return { $addFields: _addField };
    }
    static randomString(length: any) {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let result: string[] = [];
        for (let i = 0; i < length; i++) {
            result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
    }
    static guid(): string {
        return `${this.randomString(8)}-${this.randomString(4)}-${this.randomString(4)}-${this.randomString(4)}-${this.randomString(12)}`;
    }
    static getStudentReportExcel(data: any[]) {
        let _header = {
            "Order": "",
            "Ref": "",
            "Last Name": "",
            "First Name": "",
            "Collected": "",
            "Returned": "",
            "Size": "",
            "Hood": "",
            "Course": "",
            "Guest": "Last Name",
            "Guest Name": "First Name",
            "Guest Email": "Email",
            "Guest Ticket": "Ticket",
        }
        let _excelData: any[] = [];
        _excelData.push(_header);
        let _merge = [];
        for (let i = 0; i < 9; i++) {
            _merge.push({ s: { r: 0, c: i }, e: { r: 1, c: i } });
        }
        _merge.push({ s: { r: 0, c: 9 }, e: { r: 0, c: 12 } });
        let _rn = 2;
        let _dateGroup = UtilityService.groupBy(data, 'date');
        for (let _key in Object.keys(_dateGroup)) {
            let _dateData = _dateGroup[_key];
            let _timeGroup = UtilityService.groupBy(_dateData, 'time');
            for (let _timeKey in Object.keys(_timeGroup)) {
                let _timeData: any[] = _timeGroup[_timeKey];
                let _dtRow = {
                    "Order": `${_key} ${_timeKey}`,
                    "Ref": "",
                    "Last Name": "",
                    "First Name": "",
                    "Collected": "",
                    "Returned": "",
                    "Size": "",
                    "Hood": "",
                    "Course": "",
                    "Guest": "",
                    "Guest Name": "",
                    "Guest Email": "",
                    "Guest Ticket": "",
                }
                _excelData.push(_dtRow)
                _merge.push({ s: { r: _rn, c: 0 }, e: { r: _rn, c: 12 } });
                _rn++;
                for (let i = 0; i < _timeData.length; i++) {
                    let _rowData: any = _timeData[i];
                    let _row = {
                        "Order": _rowData.orderNumber,
                        "Ref": _rowData.refno,
                        "Last Name": _rowData.lastName,
                        "First Name": _rowData.firstName,
                        "Collected": _rowData.collectionLocation,
                        "Returned": _rowData.returnLocation,
                        "Size": _rowData.size,
                        "Hood": _rowData.hood,
                        "Course": _rowData.course.name,
                        "Guest": "",
                        "Guest Name": "",
                        "Guest Email": "",
                        "Guest Ticket": "",
                    }
                    if (_rowData.guest.length > 0) {
                        for (let g = 0; g < _rowData.guest.length; g++) {
                            let _grow = {
                                ..._row,
                                "Guest": _rowData.guest[g].lastName,
                                "Guest Name": _rowData.guest[g].firstName,
                                "Guest Email": _rowData.guest[g].email,
                                "Guest Ticket": _rowData.guest[g].ticket,
                            }
                            _excelData.push(_grow)
                        }
                        if (_rowData.guest.length > 1) {
                            let _hc = _rowData.guest.length;
                            for (let ri = 0; ri < 9; ri++) {
                                _merge.push({ s: { r: _rn, c: ri }, e: { r: _rn + _hc - 1, c: ri } });
                            }
                            _rn = _rn + _hc;
                        }
                        else {
                            _rn++;
                        }
                    }
                    else {
                        _excelData.push(_row)
                        _rn++;
                    }
                }
            }
        }
        const ws = XLSX.utils.json_to_sheet(_excelData);
        ws["!merges"] = _merge;
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Student On-Site");
        return XLSX.write(wb, { type: "buffer" });
    }
    static getStaffReportExcel(data: any[]) {
        let _header = {
            "Order": "",
            "Ref": "",
            "Ceremony": "",
            "Ceremony Date": "",
            "Ceremony Time": "",
            "Last Name": "",
            "First Name": "",
            "Qualification": "",
            "Faculty": "",
            "From Institute": "",
            "Size": "",
            "In Year": "",
            "Requirements": "",
        }
        let _excelData: any[] = [];
        _excelData.push(_header);
        for (let i = 0; i < data.length; i++) {
            let _rowData = data[i];
            let _row = {
                "Order": _rowData.orderNumber,
                "Ref": _rowData.refno,
                "Ceremony": _rowData.institute.name,
                "Ceremony Date": _rowData.date,
                "Ceremony Time": _rowData.time,
                "Last Name": _rowData.lastName,
                "First Name": _rowData.firstName,
                "Qualification": _rowData.qualification,
                "Faculty": _rowData.faculty,
                "From Institute": _rowData.graduated,
                "Size": _rowData.size,
                "In Year": _rowData.year,
                "Requirements": _rowData.requirement,
            }
            _excelData.push(_row);
        }
        const ws = XLSX.utils.json_to_sheet(_excelData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Staff On-Site");
        return XLSX.write(wb, { type: "buffer" });;
    }

}