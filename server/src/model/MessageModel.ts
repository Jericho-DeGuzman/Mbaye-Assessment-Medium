import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    message: {
        type: String,
        require: true,
    },
    timestamp: {
        type: Number,
        require: true,
    },
    sender_id: {
        type: String,
        require: true
    },
    sender_username: {
        type: String,
        require: true
    }
})

const MessageModel = mongoose.model('Message', messageSchema);
export default MessageModel;