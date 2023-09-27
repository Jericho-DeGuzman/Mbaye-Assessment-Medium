"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const messageSchema = new mongoose_1.default.Schema({
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
});
const MessageModel = mongoose_1.default.model('Message', messageSchema);
exports.default = MessageModel;
