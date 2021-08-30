import { Router } from "express";

import createOAuthClient from "./create";
import getOAuthClient from "./getClient";

const OAuthClientsRouter = new Router();

OAuthClientsRouter.post("/create", createOAuthClient);
OAuthClientsRouter.post("/get/:clientId", getOAuthClient);

export default OAuthClientsRouter;
