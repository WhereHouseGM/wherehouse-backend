import * as express from "express";
import { NextFunction } from 'express';
import UserModel from '@models/user.model';
import { UserNotFoundError } from "@errors/user-not-found-error";
import { buildTokenResponse } from '@resources/v1/auth/builder';
import { checkUserEmailAndPassword, validateRequest } from '@resources/v1/auth/sign-in/service';

export default function signIn(app: express.Application): void {
    app.post('/v1/auth/sign-in', async function(req: express.Request, res: express.Response, next: NextFunction) {
        try {
            validateRequest(req.body);
            const user = await checkUserEmailAndPassword(req.body);
            const tokenResponse = buildTokenResponse(user.id);
            res.status(200).send(tokenResponse);
        } catch(e) {
            console.error(e);
            next(e);
        }
    });
}