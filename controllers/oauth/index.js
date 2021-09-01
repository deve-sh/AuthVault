import { Router } from "express";

import generateCode from "./code";
import getOAuthToken from "./getOAuthToken";
import getUserDetails from "./getUserDetails";

const OAuthRouter = new Router();

OAuthRouter.post("/code", generateCode);
OAuthRouter.post("/getToken", getOAuthToken);
OAuthRouter.post("/getUserDetails", getUserDetails);

export default OAuthRouter;
