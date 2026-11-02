import OpenAI from "openai";
import { env } from "../../config/env";
import { ChatInput } from "./chat.schema";

const client = new OpenAI({ apiKey: env.OPENAI_API_KEY });

const SYSTEM_PROMPT = "You are a helpful assistant in a demo chat app. Keep answers short and clear.";
const MAX_OUTPUT_TOKENS = 300;

export function streamReply(messages: ChatInput["messages"]) {
  return client.chat.completions.create({
    model: env.OPENAI_MODEL,
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    max_completion_tokens: MAX_OUTPUT_TOKENS,
    stream: true,
  });
}
