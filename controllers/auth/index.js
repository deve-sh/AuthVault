import { Router } from "express";

import register from "./register";
import token from "./token";

const authRouter = new Router();

authRouter.post("/register", register);
authRouter.post("/token", token);

export default authRouter;
