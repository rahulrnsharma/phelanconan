import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { UtilityService } from "./utility.service";
import { Model, PipelineStage } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { StudentGownDocument, StudentGownModel } from "src/Schema/student-gown.schema";

@Injectable()
export class SendMailService {
    constructor(private mailerService: MailerService) { }
    async sendMail(_data: any) {
        const setmail = await this.mailerService.sendMail({
            to: "rahulrnsharma@gmail.com",
            from: 'rahulrnsharma@gmail.com',
            subject: 'Response Of Phelanconan',
            html: `<ol><li>Name:${_data[0].firstName + " " + _data[0].lastName}</li>
            <li>Email:${_data[0].email}</li>
            <li>Phone:${_data[0].phone}</li>
            <li>Height:${_data[0].size + " " + _data[0].height}</li>
            <li>Address:${_data[0].addressLine + ", " + _data[0].addressLine1}</li>
            <li>Zip Code:${_data[0].zipcode}</li>
            <li>City:${_data[0].city}</li>
            <li>Country:${_data[0].country}</li>
            <li>Institute:${_data[0].institute["name"]}</li>
            <li>Graduation Data:${_data[0].date}</li>
            <li>Ceremony Time:${_data[0].time}</li>
            <li>Faculty:${_data[0].faculty["name"]}</li>
            <li>Course:${_data[0].course["name"]}</li>  
            <li>Country:${_data[0].orderId}</li>
            <li>Country:${_data[0].paymentStatus}</li>
            </ol>`
        })
        return { success: true }
    }
}

