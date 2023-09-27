"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AuthMiddleware_1 = require("../../middleware/AuthMiddleware");
const MessageController_1 = __importDefault(require("../../controller/MessageController"));
const TokenAuthMiddleware_1 = require("../../middleware/TokenAuthMiddleware");
const router = express_1.default.Router();
const messageController = new MessageController_1.default();
router.route('/api/messages')
    .post(AuthMiddleware_1.authenticateUser, messageController.retrieveMessages);
router.route('/api/create-message')
    .post(TokenAuthMiddleware_1.authenticateToken, messageController.createMessage);
exports.default = router;
