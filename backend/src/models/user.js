import  { Schema, model } from 'mongoose'
const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        default: true,
        required: true
    },
    role: {
        type: String,
        required: true,
        emun: ['STUDENT', 'MODERATOR']
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

export  const User =  model( 'User', UserSchema );