import { User } from "./user.interface";

export interface Message{
    _id:string
    message:string;
    user:User,
    createdAt:Date;
}