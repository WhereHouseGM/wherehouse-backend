import auth from './auth';
import warehouses from './warehouse';
import userDemands from './user-demand';
import * as express from "express";

export default function(app: express.Application): void {
    auth.forEach(resource => resource(app));
    warehouses(app);
    userDemands(app);
}