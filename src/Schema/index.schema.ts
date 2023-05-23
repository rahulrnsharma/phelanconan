import { AdminModel } from "./admin.schema"
import { LoginModel } from "./auth.schema"
import { CourseModel } from "./course.schema"
import { InstituteModel } from "./institute.schema"

export const ADMIN_SCHEMA ={schema:AdminModel.schema,name:AdminModel.name}
export const LOGIN_SCHEMA= {name:LoginModel.name,schema:LoginModel.schema}
export const INSTITUTE_SCHEMA ={name:InstituteModel.name,schema:InstituteModel.schema}
export const COURSE_SCHEMA ={name:CourseModel.name,schema:CourseModel.schema}
export const ALL_SCHEMA = [
    ADMIN_SCHEMA,
    LOGIN_SCHEMA,
    INSTITUTE_SCHEMA,
    COURSE_SCHEMA
]