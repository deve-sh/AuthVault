import express from "express";
import cors from "cors";
import helmet from "helmet";

// Controller Routers
import authRouter from "./controllers/auth";

const app = express();

app.use(cors());
app.use(helmet());

app.use("/api/auth", authRouter);

app.listen(process.env.PORT || 8080, () => console.log("App running."));
