import User from '../models/user.js'
import { StatusCodes } from 'http-status-codes'

import {BadRequestError, unAuthenticatedError} from '../errors/index.js'
import attachCookie from '../utils/attachCookie.js'

// register controller
const register = async(req, res, next) => {
    // get data from request body
    const {name, email, password} = req.body;
    // check if something missing
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all values')
    }
    // check if user already exist
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('This email is already registered')
    }
    // create the user
    const user = await User.create(req.body);
    // create token
    const token = user.createJWT()
    // cookie
    attachCookie({res, token})
    // sending response
    res.status(StatusCodes.CREATED).json({
        // hard coded for not send the password to the frontend as create method automatically send it
        user: {
            name: user.name,
            email: user.email,
        },
    })
}

// Login Controller
const login = async(req,res,next) =>{
    // get email and password from the request body
  const { email, password } = req.body;
  // check email and password both are present
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  // create the user instance
  const user = await User.findOne({ email }).select("+password");
  // if email does not match throw error
  if (!user) {
    throw new unAuthenticatedError("Invalid Credential");
  }
  // check if the password is correct or not
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new unAuthenticatedError("Invalid Credential");
  }
  // create the token
  const token = user.createJWT();
  //cookie
  attachCookie({res, token})
  // remove password from the response
  user.password = undefined;
  // send the response
  res.status(StatusCodes.OK).json({ user });
}

//update user controller
const updateUser = async (req, res, next) => {
    // get info from request body
  const { email, name} = req.body;
  // check both are present
  if (!email || !name) {
    throw new BadRequestError("Please provide all values");
  }
  // get the user
  const user = await User.findOne({ _id: req.user.userId });
  // set the value
  user.email = email;
  user.name = name;
  // save user after update
  await user.save();
  // create token
  const token = user.createJWT();
  attachCookie({res, token})
  // send response
  res.status(StatusCodes.OK).json({ user });
};


// Get the user
const getCurrentUser = async(req,res) => {
  const user = await User.findOne({_id: req.user.userId})
  res.status(StatusCodes.OK).json({user})
}

// Logout user
const logout =async(req,res)=> {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now())
  })
  res.status(StatusCodes.OK).json({msg: 'User logged out!'})
}

export { register, login, updateUser, getCurrentUser, logout };