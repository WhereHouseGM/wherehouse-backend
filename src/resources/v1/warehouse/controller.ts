import * as express from "express";
import { NextFunction } from 'express';
import { getWarehouses } from '@resources/v1/warehouse/service';

export function warehouses(app: express.Application) {
    app.get('/v1/warehouses', async function(req: express.Request, res: express.Response, next: NextFunction) {
        const warehouses = await getWarehouses(req.query);
        res.status(200).send({ warehouses: warehouses });
    });
}