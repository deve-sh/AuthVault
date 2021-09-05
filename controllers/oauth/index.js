import { Router } from "express";

import loginUser from "./login";
import generateCode from "./code";
import getOAuthToken from "./getOAuthToken";
import getUserDetails from "./getUserDetails";

const OAuthRouter = new Router();

OAuthRouter.get("/login", loginUser);
OAuthRouter.post("/code", generateCode);
OAuthRouter.post("/getToken", getOAuthToken);
OAuthRouter.post("/getUserDetails", getUserDetails);

export default OAuthRouter;
