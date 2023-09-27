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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const users = [
    { id: 'user_1', username: "John" },
    { id: 'user_2', username: "Angela" },
    { id: 'user_3', username: "Jericho" }
];
function authenticateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, username } = req.body;
        // check dummyUser object if user exist.
        let isExist = false;
        for (let user of users) {
            if (user.id == id && user.username == username) {
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            return res.status(401).send('Unauthorized');
        }
        return next();
    });
}
exports.authenticateUser = authenticateUser;
