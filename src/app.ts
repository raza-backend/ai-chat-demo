import path from "path";
import express from "express";
import helmet from "helmet";
import "./config/env";
import { chatRouter } from "./modules/chat/chat.routes";
import { errorHandler } from "./middleware/error";

export const app = express();
app.set("trust proxy", 1);
app.use(helmet());
app.use(express.json({ limit: "50kb" }));
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/health", (_req, res) => res.json({ status: "ok", uptime: process.uptime() }));
app.use("/api/chat", chatRouter);

app.use((_req, res) => res.status(404).json({ error: "Not found" }));
app.use(errorHandler);
