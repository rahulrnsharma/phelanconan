import { AdminModel } from "./admin.schema"
import { LoginModel } from "./auth.schema"

export const ADMIN_SCHEMA ={schema:AdminModel.schema,name:AdminModel.name}
export const LOGIN_SCHEMA= {name:LoginModel.name,schema:LoginModel.schema}
export const ALL_SCHEMA = [
    ADMIN_SCHEMA,
    LOGIN_SCHEMA
]