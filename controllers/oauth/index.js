import { Router } from "express";

import generateCode from "./code";

const OAuthRouter = new Router();

OAuthRouter.post("/code", generateCode);

export default OAuthRouter;
