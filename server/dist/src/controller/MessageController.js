"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TokenMiddleware_1 = require("../middleware/TokenMiddleware");
const socketio_1 = require("../config/socketio");
const MessageModel_1 = __importDefault(require("../model/MessageModel"));
class MessageController {
    retrieveMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, username } = req.body;
            const token = (0, TokenMiddleware_1.generateToken)(id, username);
            try {
                const messages = yield MessageModel_1.default.find().sort({ timeStamp: 1 });
                return res.status(200).send({ messages, token });
            }
            catch (err) {
                console.log(err);
                res.status(500).send('Internal Server Error.');
            }
        });
    }
    createMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const io = (0, socketio_1.getIO)();
            const { message, timestamp, sender_id, sender_username } = req.body;
            const newMessage = new MessageModel_1.default({
                message, timestamp, sender_id, sender_username
            });
            try {
                yield newMessage.save();
                io.emit('message_sent', { message, timestamp, sender_id, sender_username });
                res.status(200).send("message sent.");
            }
            catch (err) {
                console.log(err);
                res.status(500).send({ error: "Internal server error" });
            }
        });
    }
}
exports.default = MessageController;
