import {Request, Response, response} from 'express'
import mongoose from "mongoose";
import { generateToken } from '../middleware/TokenMiddleware';
import { getIO } from '../config/socketio';
import MessageModel from '../model/MessageModel';

class MessageController {
    async retrieveMessages(req: Request, res: Response) {
        const {id, username} = req.body;        
        const token = generateToken(id, username);
        
        try {
            const messages = await MessageModel.find().sort({timeStamp: 1});
            return res.status(200).send({messages, token});
        } catch (err) {
            console.log(err);
            res.status(500).send('Internal Server Error.');
        }
    }

    async createMessage (req: Request, res: Response) {
        const io = getIO();
        const {message, timestamp, sender_id, sender_username} = req.body;
        const newMessage = new MessageModel({
            message, timestamp, sender_id, sender_username
        });

        try {
            await newMessage.save();
            io.emit('message_sent', {message, timestamp, sender_id, sender_username});
            res.status(200).send("message sent.");
        } catch (err) {
            console.log(err)
            res.status(500).send({error: "Internal server error"});
        }
    }
}

export default MessageController;