import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GownController } from "./gown.controller";
import { COURSE_SCHEMA, FACULTY_SCHEMA, INSTITUTE_SCHEMA, STAFF_GOWN_SCHEMA, STUDENT_GOWN_SCHEMA, TRANSACTION_SCHEMA } from "src/Schema";
import { GownService } from "src/service/gown.service";
import { MailerModule, MailerService } from "@nestjs-modules/mailer";
import { InstituteService } from "src/service/institute.service";
import { FacultyService } from "src/service/faculty.service";
import { CourseService } from "src/service/course.service";
import { PaymentService } from "src/service/payment.service";
import { HttpModule } from "@nestjs/axios";
import { SendMailService } from "src/service/sendmail.service";



@Module({
    imports: [MongooseModule.forFeature([STUDENT_GOWN_SCHEMA, INSTITUTE_SCHEMA, FACULTY_SCHEMA, COURSE_SCHEMA, TRANSACTION_SCHEMA, STAFF_GOWN_SCHEMA]),
    MailerModule.forRoot({
        transport: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "rahulrnsharma@gmail.com",
                pass: "pxklyipvcijtlash"
            }
        }
    }), HttpModule],
    controllers: [GownController],
    providers: [GownService, InstituteService, FacultyService, CourseService, PaymentService, SendMailService],
    exports: []
})

export class AppGownModule { }