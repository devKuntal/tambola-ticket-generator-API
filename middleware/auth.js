import jwt from 'jsonwebtoken'
import {unAuthenticatedError} from '../errors/index.js'

const auth = async (req, res, next) => {
    // create token
    const token = req.cookies.token
    // check token is present or not
    if(!token){
        throw new unAuthenticatedError('Authentication invalid')
    }
    // verify and setting the user id
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {userId: payload.userId};
        next();
    } catch (error) {
        throw new unAuthenticatedError('Authentication Failed')
    }
}

export default auth;