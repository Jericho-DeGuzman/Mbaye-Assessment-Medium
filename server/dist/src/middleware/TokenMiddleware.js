"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secretKey = process.env.APP_SECRET_KEY;
const generateToken = (user_id, username) => {
    let token = '';
    try {
        if (secretKey) {
            token = jsonwebtoken_1.default.sign({ user_id, username }, secretKey);
        }
        else {
            throw new Error('secret key is undefined.');
        }
    }
    catch (err) {
        console.error(err);
    }
    return token;
};
exports.generateToken = generateToken;
