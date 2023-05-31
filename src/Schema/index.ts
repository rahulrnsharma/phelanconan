import { AdminModel } from "./admin.schema"
import { LoginModel } from "./login.schema"
import { CourseModel } from "./course.schema"
import { InstituteModel } from "./institute.schema"
import { FacultyModel } from "./faculty.schema"
import { CeremonyModel } from "./ceremony.schema"

export const ADMIN_SCHEMA ={schema:AdminModel.schema,name:AdminModel.name}
export const LOGIN_SCHEMA= {name:LoginModel.name,schema:LoginModel.schema}
export const INSTITUTE_SCHEMA ={name:InstituteModel.name,schema:InstituteModel.schema}
export const COURSE_SCHEMA ={name:CourseModel.name,schema:CourseModel.schema}
export const FACULTY_SCHEMA = {name:FacultyModel.name,schema:FacultyModel.schema}
export const CEREMONY_SCHEMA ={name:CeremonyModel.name,schema:CeremonyModel.schema}
export const ALL_SCHEMA = [
    ADMIN_SCHEMA,
    LOGIN_SCHEMA,
    INSTITUTE_SCHEMA,
    COURSE_SCHEMA,
    FACULTY_SCHEMA,
    CEREMONY_SCHEMA
]