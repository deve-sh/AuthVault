import { Router } from "express";

const OAuthClientsRouter = new Router();

OAuthClientsRouter.post("/create", (_, res) => res.sendStatus(204));
OAuthClientsRouter.post("/get/:clientId", (_, res) => res.sendStatus(204));

export default OAuthClientsRouter;
