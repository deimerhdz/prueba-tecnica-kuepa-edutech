import  { Schema, model } from 'mongoose'
const MessageSchema = Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        default: true,
        required: true
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
});
export const Message =  model( 'Message', MessageSchema );