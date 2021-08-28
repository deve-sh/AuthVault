import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());

app.listen(process.env.PORT || 8080, () => console.log("App running."));
