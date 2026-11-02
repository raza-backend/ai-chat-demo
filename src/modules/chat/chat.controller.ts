import { Request, Response } from "express";
import { chatSchema } from "./chat.schema";
import { streamReply } from "./chat.service";

export async function chat(req: Request, res: Response) {
  const { messages } = chatSchema.parse(req.body);
  const stream = await streamReply(messages);

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache");

  try {
    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content;
      if (text) res.write(text);
    }
  } catch (err) {
    // Headers are already sent, so the error handler can't reply with JSON
    console.error(err);
  }
  res.end();
}
