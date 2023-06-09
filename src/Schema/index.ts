import { AdminModel } from "./admin.schema"
import { LoginModel } from "./login.schema"
import { CourseModel } from "./course.schema"
import { InstituteModel } from "./institute.schema"
import { FacultyModel } from "./faculty.schema"
import { CeremonyModel } from "./ceremony.schema"
import { StudentGownModel } from "./student-gown.schema"
import { TransactionModel } from "./transaction.schema"
import { StaffGownModel } from "./staff-gown.schema"
import { StaffModel } from "./staff.schema"
import { UserModel } from "./user.schema"
import { StaffCeremonyModel } from "./staff-ceremony.schema"

export const ADMIN_SCHEMA = { schema: AdminModel.schema, name: AdminModel.name }
export const CEREMONY_SCHEMA = { name: CeremonyModel.name, schema: CeremonyModel.schema }
export const COURSE_SCHEMA = { name: CourseModel.name, schema: CourseModel.schema }
export const FACULTY_SCHEMA = { name: FacultyModel.name, schema: FacultyModel.schema }
export const INSTITUTE_SCHEMA = { name: InstituteModel.name, schema: InstituteModel.schema }
export const LOGIN_SCHEMA = { name: LoginModel.name, schema: LoginModel.schema }
export const STAFF_GOWN_SCHEMA = { name: StaffGownModel.name, schema: StaffGownModel.schema }
export const STAFF_SCHEMA = { name: StaffModel.name, schema: StaffModel.Schema }
export const STUDENT_GOWN_SCHEMA = { name: StudentGownModel.name, schema: StudentGownModel.schema }
export const TRANSACTION_SCHEMA = { name: TransactionModel.name, schema: TransactionModel.schema }
export const USER_SCHEMA = { name: UserModel.name, schema: UserModel.schema }
export const STAFF_CEREMONY_SCHEMA ={name: StaffCeremonyModel.name, schema: StaffCeremonyModel.schema}
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
    STAFF_SCHEMA,
    STAFF_CEREMONY_SCHEMA
]