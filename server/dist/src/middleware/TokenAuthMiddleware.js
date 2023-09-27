"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authenticateToken(req, res, next) {
    const secretKey = process.env.APP_SECRET_KEY;
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).send('Access denied, token missing');
    }
    try {
        if (secretKey) {
            jsonwebtoken_1.default.verify(token, secretKey);
            next();
        }
    }
    catch (err) {
        return res.status(403).send('Invalid token');
    }
}
exports.authenticateToken = authenticateToken;
