import { Router } from "express";

import register from "./register";

const authRouter = new Router();

authRouter.post("/register", register);

export default authRouter;
