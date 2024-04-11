
import * as AuthService from '../service/auth.service.js'
import { handleErrorResponse } from '../utils/handle-error.js';
import { generateJWT } from '../utils/handle-token.js';
const login =  async (req,res)=>{
    try {
       const { username, password } = req.body;
       const data = await AuthService.login(username,password);
       res.json(data)
    } catch (error) {
        handleErrorResponse(res,error.message,404);
    }   
}
const register = async(req,res)=>{
    try {
        const data = await AuthService.register(req.body);
        res.json(data);
    } catch (error) {
        handleErrorResponse(res,error.message,500);
    }
}

const renewToken = async( req, res ) =>{
    const { user } = req;
    const token = await generateJWT( user.id );
    res.json({
        user,
        token
    })
}

export {
    login,
    register,
    renewToken
}