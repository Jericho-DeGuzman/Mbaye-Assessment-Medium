import express, {Request, Response, NextFunction} from 'express';

const users = [
    {id: 'user_1', username: "John"},
    {id: 'user_2', username: "Angela"},
    {id: 'user_3', username: "Jericho"}
]

export async function authenticateUser (req: Request, res: Response, next: NextFunction) {
    const {id, username} = req.body;
    // check dummyUser object if user exist.
    let isExist = false

    for (let user of users) {
        if (user.id == id && user.username == username) {
            isExist = true;
            break;
        }
    }

    if(!isExist) {
        return res.status(401).send('Unauthorized');
    }

    return next();
}

