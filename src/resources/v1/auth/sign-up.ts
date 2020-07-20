import * as express from 'express';
import db from '@models';
import signUpRequestValidator from './sign-up-request-validator';
import buildTokenResponse from './build-token-response';
import UserModel from '../../../models/user.model';

const models = db.models;

function signUp (app: express.Application): void {
    app.post('/v1/auth/sign-up', async (req: express.Request, res: express.Response) => {
        try {
            const result = await signUpRequestValidator.validate(req.body);
            if(result.error) throw new Error(result.error);

            const newUser = await models['users'].create(req.body) as UserModel;

            const tokenResponse = buildTokenResponse(newUser.id);
            res.status(201).send(tokenResponse);
        } catch(e) {
            console.log(e);
            res.status(400).send({
                message: "잘못된 요청입니다"
            });
        }
    });
}

export default signUp;