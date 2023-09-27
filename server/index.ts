import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import { initializeMongoDB } from './src/config/mongodb';
import routes from './src/route/route';
import http from 'http';
import { configureSocket } from './src/config/socketio';
import cors from 'cors';

const app = express();
const server = http.createServer(app);
configureSocket(server);

app.use(cors({origin: 'http://localhost:3000'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

initializeMongoDB();

app.use(routes);

server.listen(8080, () => {
    console.log("Server is running..");
})
