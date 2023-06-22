import { StudentGownDto } from "src/dto/student-gown.dto";
import { InstituteService } from "./institute.service";
import { FacultyService } from "./faculty.service";
import { CourseService } from "./course.service";
import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class SendMailService {
    constructor(private instituteService:InstituteService,
        private facultyService:FacultyService,
        private courseService:CourseService,
        private mailerService: MailerService){}
     async sendMail(studentGownDto: StudentGownDto){
        const instituteId = studentGownDto.institute.toString();
        const facultyId =studentGownDto.faculty.toString();
        const courseId = studentGownDto.course.toString();
        const institute =await this.instituteService.getById(instituteId);
        const faculty =await this.facultyService.getById(facultyId);
        const course =await this.courseService.getById(courseId);
        const setmail=   await this.mailerService.sendMail({
            to: "rahulrnsharma@gmail.com",
            from: 'rahulrnsharma@gmail.com',
            subject: 'Response Of Phelanconan',
            html:`<ol><li>Name:${studentGownDto.firstName+" "+studentGownDto.lastName}</li>
            <li>Email:${studentGownDto.email}</li>
            <li>Phone:${studentGownDto.phone}</li>
            <li>Height:${studentGownDto.size+" "+studentGownDto.height}</li>
            <li>Address:${studentGownDto.addressLine+", "+studentGownDto.addressLine1}</li>
            <li>Zip Code:${studentGownDto.zipcode}</li>
            <li>City:${studentGownDto.city}</li>
            <li>Country:${studentGownDto.country}</li>
            <li>Institute:${institute.name}</li>
            <li>Graduation Data:${studentGownDto.date}</li>
            <li>Ceremony Time:${studentGownDto.time}</li>
            <li>Faculty:${faculty.name}</li>
            <li>Course:${course.name}</li>  
            </ol>` 
        })
        return {success:true}
     }
}