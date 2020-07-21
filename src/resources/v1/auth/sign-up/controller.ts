import * as express from 'express';
import { createUserAndBuildTokenResponse, validateRequest } from '@resources/v1/auth/sign-up/service';


export function signUp (app: express.Application): void {
    app.post('/v1/auth/sign-up', async (req: express.Request, res: express.Response) => {
        try {
            validateRequest(req.body);
            const tokenResponse = await createUserAndBuildTokenResponse(req.body);
            res.status(201).send(tokenResponse);
        } catch(e) {
            res.status(400).send({
                message: "잘못된 요청입니다"
            });
        }
    });
}
