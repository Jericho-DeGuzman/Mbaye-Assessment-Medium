"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeMongoDB = exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const initializeMongoDB = () => {
    try {
        const url = process.env.DB_URL;
        if (url) {
            mongoose_1.default.connect(url);
            exports.db = mongoose_1.default.connection;
            console.log("connected to database");
            return exports.db;
        }
        else {
            console.error("url is undefined");
        }
    }
    catch (err) {
        console.log(err);
    }
};
exports.initializeMongoDB = initializeMongoDB;
