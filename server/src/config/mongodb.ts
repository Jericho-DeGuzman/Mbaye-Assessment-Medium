import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export let db: Connection;

export const initializeMongoDB = () => {
    try{
        const url = process.env.DB_URL;
        if (url) {
            mongoose.connect(url);
            db = mongoose.connection;
            console.log("connected to database");
            
            return db;
        } else {
            console.error("url is undefined");
        }

    } catch (err) {
        console.log(err);
    }
};