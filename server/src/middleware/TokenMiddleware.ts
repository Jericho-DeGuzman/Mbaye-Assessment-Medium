import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const secretKey = process.env.APP_SECRET_KEY;

export const generateToken = (user_id: string, username: string): string => {
    let token: string = '';
    try {
        if (secretKey) {
            token = jwt.sign({user_id, username}, secretKey);
        } else {
            throw new Error ('secret key is undefined.')
        }
    } catch (err) {
        console.error(err);
    }
    return token;
}