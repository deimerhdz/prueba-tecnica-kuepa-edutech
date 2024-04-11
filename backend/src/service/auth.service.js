import { User } from "../models/user.js";
import { generateJWT } from '../utils/handle-token.js';
import bcryptjs  from 'bcryptjs';
export const login = async(username,password)=>{
 const user = await User.findOne({ username });
 if ( !user ) {
    throw new Error('invalid username or password')
 }
 const validPassword = bcryptjs.compareSync( password, user.password );
 if ( !validPassword ) {
    throw new Error('invalid username or password');
 }
 const token = await generateJWT( user._id );
return {
     user,
     token
    }
}

export const register = async(body)=>{
    const { name, username, password,role } = body;
    const userDB = await User.findOne({ username });
    if ( userDB ) {
        throw new Error('User already exists.');
    }
    const user = new User({ name, username, password,role });
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );
    await user.save();
    return {
        user
    }

}