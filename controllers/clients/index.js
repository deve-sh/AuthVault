import { Router } from "express";

import createOAuthClient from "./create";
import getOAuthClient from "./getClient";
import listOAuthClient from "./listClients";
import deleteOAuthClient from "./deleteClient";

const OAuthClientsRouter = new Router();

OAuthClientsRouter.post("/create", createOAuthClient);
OAuthClientsRouter.get("/get/:clientId", getOAuthClient);
OAuthClientsRouter.get("/list", listOAuthClient);
OAuthClientsRouter.delete("/delete/:clientId", deleteOAuthClient);

export default OAuthClientsRouter;
