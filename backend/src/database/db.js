import mongoose  from "mongoose";

export const connection = async() => {
    try {

        await mongoose.connect( process.env.MONGODB_CONNECTION);
    
        console.log('Database is connected');
    
    } catch (error) {
        console.log(error);
        throw new Error('Error when starting the database');
    }
}

export const disconnect = async() => {
    try {

        await mongoose.disconnect();
    
        console.log('Database is connected');
    
    } catch (error) {
        console.log(error);
        throw new Error('Error when starting the database');
    }
}