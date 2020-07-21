import auth from './auth';
import * as express from "express";

export default function(app: express.Application): void {
    auth.forEach(resource => resource(app));
}