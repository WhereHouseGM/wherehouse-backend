import v1 from './v1';
import * as express from "express";

export default function(app: express.Application): void {
    v1(app);
}
