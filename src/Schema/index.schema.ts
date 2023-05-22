import { AdminModel } from "./admin.schema"

export const ADMIN_SCHEMA ={schema:AdminModel.schema,name:AdminModel.name}

export const ALL_SCHEMA = [
    ADMIN_SCHEMA
]