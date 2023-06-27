import { AdminModel } from "./admin.schema"
import { LoginModel } from "./login.schema"
import { CourseModel } from "./course.schema"
import { InstituteModel } from "./institute.schema"
import { FacultyModel } from "./faculty.schema"
import { CeremonyModel } from "./ceremony.schema"
import { StudentGownModel } from "./student-gown.schema"
import { TransactionModel } from "./transaction.schema"
import { StaffGownModel } from "./staff-gown.schema"
import { InstituteStaffModel } from "./instituteStaff.schema"

export const ADMIN_SCHEMA = { schema: AdminModel.schema, name: AdminModel.name }
export const LOGIN_SCHEMA = { name: LoginModel.name, schema: LoginModel.schema }
export const INSTITUTE_SCHEMA = { name: InstituteModel.name, schema: InstituteModel.schema }
export const COURSE_SCHEMA = { name: CourseModel.name, schema: CourseModel.schema }
export const FACULTY_SCHEMA = { name: FacultyModel.name, schema: FacultyModel.schema }
export const CEREMONY_SCHEMA = { name: CeremonyModel.name, schema: CeremonyModel.schema }
export const STUDENT_GOWN_SCHEMA = { name: StudentGownModel.name, schema: StudentGownModel.schema }
export const TRANSACTION_SCHEMA = { name: TransactionModel.name, schema: TransactionModel.schema }
export const STAFF_GOWN_SCHEMA = {name: StaffGownModel.name, schema:StaffGownModel.schema}
export const INSTITUTE_STAFF_SCHEMA = {name:InstituteStaffModel.name,schema:InstituteStaffModel.Schema}
export const ALL_SCHEMA = [
    ADMIN_SCHEMA,
    LOGIN_SCHEMA,
    INSTITUTE_SCHEMA,
    COURSE_SCHEMA,
    FACULTY_SCHEMA,
    CEREMONY_SCHEMA,
    STUDENT_GOWN_SCHEMA,
    TRANSACTION_SCHEMA,
    STAFF_GOWN_SCHEMA,
    INSTITUTE_STAFF_SCHEMA
]