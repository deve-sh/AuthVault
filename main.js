import express from "express";
import cors from "cors";
import helmet from "helmet";

// Controller Routers
import authRouter from "./controllers/auth";
import OAuthClientsRouter from "./controllers/clients";

// Middlewares
import validateFirebaseToken from "./helpers/validateFirebaseToken";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/clients", validateFirebaseToken, OAuthClientsRouter);

app.listen(process.env.PORT || 8080, () => console.log("App running."));
