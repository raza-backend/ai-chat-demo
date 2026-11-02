import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  OPENAI_API_KEY: z.string().min(1),
  OPENAI_MODEL: z.string().min(1).default("gpt-4o-mini"),
  PORT: z.coerce.number().default(3000),
});

export const env = schema.parse(process.env);
