import { check } from "express-validator";
import { validateResults } from "../utils/handle-validators.js";


const registerAuthValidators =[
    check("name").exists().notEmpty(),
    check("username").exists().notEmpty().isLength({min:5,max:15}),
    check("password").exists().notEmpty(),
    (req,res,next)=>{
        return validateResults(req,res,next)
    }
]
const loginAuthValidators =[
    check("username").exists().notEmpty().isLength({min:5,max:15}),
    check("password").exists().notEmpty(),
    (req,res,next)=>{
        return validateResults(req,res,next)
    }
]
export {
    loginAuthValidators,
    registerAuthValidators
}