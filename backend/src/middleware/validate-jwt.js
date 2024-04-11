import { User } from "../models/user.js";
import jwt from 'jsonwebtoken';
const validateJWT = async( req = request, res = response, next ) => {
    const token = req.header('token');
    if ( !token ) {
        return res.status(401).json({
            msg: 'There is no token in request.'
        });
    }
    try {
        const { uid } = jwt.verify( token, process.env.JWT_SECRET_KEY );
        const user = await User.findById( uid );
        if( !user ) {
            return res.status(401).json({
                msg: 'Token invalid'
            })
        }
        req.user = user;
        next();

    } catch (error) {
       
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

}
export {
    validateJWT
}

