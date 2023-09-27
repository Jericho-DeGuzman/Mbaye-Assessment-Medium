import express from 'express';
import messageRoute from './api/MessageRoute';

const routes = express.Router();

routes.use(messageRoute);

export default routes;