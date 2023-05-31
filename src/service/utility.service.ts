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
}