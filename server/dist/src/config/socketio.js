"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.configureSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
function configureSocket(server) {
    io = new socket_io_1.Server(server);
    io.on('connection', (socket) => {
        console.log('client connected');
    });
    return io;
}
exports.configureSocket = configureSocket;
function getIO() {
    if (!io) {
        throw new Error('Socket.io has not been initialized');
    }
    return io;
}
exports.getIO = getIO;
