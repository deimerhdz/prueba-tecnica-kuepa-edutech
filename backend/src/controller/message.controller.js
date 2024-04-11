import * as MessageService from '../service/message.service.js'
import { handleErrorResponse } from '../utils/handle-error.js';
const findAll = async(req,res)=>{
    try {
        const data = await MessageService.findAllMessages();
        res.json(data);
    } catch (error) {
        handleErrorResponse(res,error.message,500);
    }
}
export {
    findAll
}