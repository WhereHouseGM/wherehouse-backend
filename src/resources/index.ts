import v1 from './v1';
import * as express from "express";
import { Model } from "sequelize";
import { ModelCtor } from 'sequelize/types/lib/model';

export default function(app: express.Application, models: { [key: string]: ModelCtor<Model> }): void {
    v1(app, models);
}
