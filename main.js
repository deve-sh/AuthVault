import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";

// Controller Routers
import authRouter from "./controllers/auth";
import OAuthClientsRouter from "./controllers/clients";
import OAuthRouter from "./controllers/oauth";

// Middlewares
import validateFirebaseToken from "./helpers/validateFirebaseToken";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(
	session({
		secret: process.env.JWT_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: true },
	})
);

app.use("/api/auth", authRouter);
app.use("/api/clients", validateFirebaseToken, OAuthClientsRouter);
app.use("/api/oauth", OAuthRouter);

app.listen(process.env.PORT || 8080, () => console.log("App running."));
