import { Message } from "../models/message.js";

export const findAllMessages = async ()=>{
    const messages = await Message.find().populate('user');
    return messages

}

export const saveMessage = async( user,message)=>{
    const msg = new Message({ user, message });
    await msg.save()
    return msg
}