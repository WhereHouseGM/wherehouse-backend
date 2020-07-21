import auth from './auth/sign-up';
import * as express from "express";

export default function(app: express.Application): void {
    auth(app);
}