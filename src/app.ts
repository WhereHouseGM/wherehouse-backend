import resources from './resources';
import sequelize from "./models";
import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

async function startServer(): Promise<void> {
    await sequelize.sync();

    resources(app, sequelize.models);

    await app.listen(3000);

    console.log("starting server on http://localhost:3000");
}

startServer();