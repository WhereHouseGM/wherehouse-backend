import 'module-alias/register';
import resources from '@resources';
import db from "@models";
import * as express from "express";
import * as bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
resources(app);

export default app;