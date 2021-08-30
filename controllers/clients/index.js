import { Router } from "express";

import createOAuthClient from './create';

const OAuthClientsRouter = new Router();

OAuthClientsRouter.post("/create", createOAuthClient);
OAuthClientsRouter.post("/get/:clientId", (_, res) => res.sendStatus(204));

export default OAuthClientsRouter;
