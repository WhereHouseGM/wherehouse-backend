import * as express from 'express';
import { createUserAndBuildTokenResponse, validateRequest } from '@resources/v1/auth/sign-up/service';
import { HttpError } from '@errors/http-error';

export function signUp (app: express.Application): void {
    app.post('/v1/auth/sign-up', async (req: express.Request, res: express.Response) => {
        try {
            validateRequest(req.body);
            const tokenResponse = await createUserAndBuildTokenResponse(req.body);
            res.status(201).send(tokenResponse);
        } catch(e) {
            if(e instanceof HttpError) {
                res.status(e.statusCode).send({"message": e.message});
            } else {
                const error = new HttpError();
                res.status(error.statusCode).send({ "message": error.message });
            }
        }
    });
}
