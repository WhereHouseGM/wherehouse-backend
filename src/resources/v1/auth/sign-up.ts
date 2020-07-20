import * as express from "express";
import db from '@models';

const models = db.models;

function signUp (app: express.Application): void {
    app.post('/v1/auth/sign-up', async (req: express.Request, res: express.Response) => {
        try {
            let newUser = await models['users'].build(req.body);
            newUser = await newUser.save();
            res.status(201).send(newUser);
        } catch(e) {
            res.status(400).send({
                message: "잘못된 요청입니다"
            });
        }
    });
}

export default signUp;