import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide your name'],
        minlength: 3,
        maxlength: 30,
        trim: true,
    },
    email:{
        type:String,
        required: [true, 'Please Provide your email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide Password at least 6 character long'],
        minlength: 6,
        select: false,
    }
})

// Hashing the password before save the user
userSchema.pre('save', async function(){
    if (!this.isModified('password')) return;
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt)
});

// custom instance method for create json web token
userSchema.methods.createJWT = function(){
    return jwt.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
}

// custom instance method for compare password
userSchema.methods.comparePassword = async function(userPassword) {
    const isMatch = await bcryptjs.compare(userPassword, this.password) ;
    return isMatch;
}

export default mongoose.model('User', userSchema);