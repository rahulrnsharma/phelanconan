import { BadRequestException, Injectable } from "@nestjs/common";
import { PipelineStage } from "mongoose";
import { SortOrderEnum } from "src/enum/common.enum";
var XLSX = require("xlsx");

@Injectable()
export class UtilityService {

    static setStartHour(date: Date, timezone: number) {
        const _timezoneDiff = (new Date().getTimezoneOffset()) - timezone;
        date.setHours(0, 0, 0, 0);
        if (_timezoneDiff != 0) {
            date.setHours(date.getHours() - Math.floor(_timezoneDiff / 60));
            date.setMinutes(date.getMinutes() - (_timezoneDiff % 60));
        }
        return date;
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
    static getUnwindPipeline(path: string): PipelineStage.Unwind {
        return { $unwind: { path: `$${path}`, preserveNullAndEmptyArrays: true } };
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
}