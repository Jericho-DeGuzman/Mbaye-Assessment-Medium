import express from 'express';
import { authenticateUser } from '../../middleware/AuthMiddleware';
import MessageController from '../../controller/MessageController';
import { authenticateToken } from '../../middleware/TokenAuthMiddleware';

const router = express.Router();

const messageController = new MessageController();

router.route('/api/messages')
    .post(authenticateUser, messageController.retrieveMessages);

router.route('/api/create-message')
    .post(authenticateToken, messageController.createMessage);


export default router;