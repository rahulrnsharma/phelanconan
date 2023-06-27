import { Types } from "mongoose";

export interface IUser {
    loggedInId?: Types.ObjectId;
    userId: Types.ObjectId;
    role: String;
}