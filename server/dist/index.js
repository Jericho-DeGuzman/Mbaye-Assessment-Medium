"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongodb_1 = require("./src/config/mongodb");
const route_1 = __importDefault(require("./src/route/route"));
const http_1 = __importDefault(require("http"));
const socketio_1 = require("./src/config/socketio");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
(0, socketio_1.configureSocket)(server);
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
(0, mongodb_1.initializeMongoDB)();
app.use(route_1.default);
server.listen(8080, () => {
    console.log("Server is running..");
});
