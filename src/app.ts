import 'module-alias/register';
import resources from '@resources';
import * as express from "express";
import * as bodyParser from "body-parser";
import { HttpError } from '@errors/http-error';
import { NextFunction } from 'express';

const app = express();
app.use(bodyParser.json());
resources(app);

app.use(function(error: Error, req: express.Request, res: express.Response, next: NextFunction) {
    if (error instanceof HttpError) res.status(error.statusCode).send({ message: error.message, timestamp: error.timestamp });
    else {
        const httpError = new HttpError();
        res.status(httpError.statusCode).send({ message: httpError.message, timestamp: httpError.timestamp });
    }
});

app.use(function(req: express.Request, res: express.Response, next: NextFunction) {
    res.status(404).send({ message: "존재하지 않는 URL입니다" });
});

export default app;