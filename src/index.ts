import express, { json, Request, Response } from "express";
import dotenv from "dotenv";

import fruitsRouter from "./routers/fruits-router";

dotenv.config();

const app = express();
app.use(json());

app.get("/health", (req: Request, res: Response) => res.send("ok!"));
app.use(fruitsRouter);

export default app;