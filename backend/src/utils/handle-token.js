import jwt from 'jsonwebtoken';
import {User} from '../models/user.js'

export const generateJWT = ( uid = '' ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid };
        jwt.sign( payload, process.env.JWT_SECRET_KEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject( "couldn't generate token" )
            } else {
                resolve( token );
            }
        })

    })
}

export const verifyJWT = async( token = '') => {
    try {
        
        if(  token.length < 10 ) {
            return null;
        }
        const { uid } = jwt.verify( token, process.env.JWT_SECRET_KEY );
        const user = await User.findById( uid );
        if ( user ) {
           return user;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }

}