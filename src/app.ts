import 'module-alias/register';
import resources from '@resources';
import db from "@models";
import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

async function startServer(): Promise<void> {
    await db.sync();

    resources(app);

    await app.listen(3000);

    console.log("starting server on http://localhost:3000");
}

startServer();