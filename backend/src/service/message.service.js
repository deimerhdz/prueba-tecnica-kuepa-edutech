import { Message } from "../models/message.js";

export const findAllMessages = async ()=>{
    const messages = await Message.find().populate('user','name','role');
    return messages

}

export const saveMessage = async( user,message)=>{
    const msg = new Message({ user, message });
    await msg.save()
    return msg
}