import { NextFunction } from 'express';
import * as express from 'express';
import { createUserAndBuildTokenResponse, validateRequest } from '@resources/v1/auth/sign-up/service';

export function signUp (app: express.Application): void {
    app.post('/v1/auth/sign-up', async (req: express.Request, res: express.Response, next: NextFunction) => {
        try {
            validateRequest(req.body);
            const tokenResponse = await createUserAndBuildTokenResponse(req.body);
            res.status(201).send(tokenResponse);
        } catch(e) {
            console.error(e);
            next(e);
        }
    });
}
