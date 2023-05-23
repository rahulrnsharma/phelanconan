import { Types } from "mongoose";

export interface IAdmin {
    loggedInId?: Types.ObjectId;
    userId: Types.ObjectId;
    role: String;
}