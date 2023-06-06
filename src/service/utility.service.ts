import { BadRequestException, Injectable } from "@nestjs/common";
var XLSX = require("xlsx");

@Injectable()
export class UtilityService {

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
}