import { Router } from "express";
import rateLimit from "express-rate-limit";
import { chat } from "./chat.controller";

const chatLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many messages, try again later" },
});

export const chatRouter = Router();
chatRouter.post("/", chatLimiter, chat);
