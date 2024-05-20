import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

admin.initializeApp();

import { routes } from './routes';

const app = express();

app.use(cors({ origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);

export const webApi = functions.https.onRequest(app);

export * from './triggers';
