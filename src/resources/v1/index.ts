import auth from './auth';
import * as express from "express";
import { Model } from "sequelize";
import { ModelCtor } from 'sequelize/types/lib/model';

export default function(app: express.Application, models: { [key: string]: ModelCtor<Model> }): void {
    auth(app, models);
}