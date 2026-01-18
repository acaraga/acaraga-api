import { z } from "@hono/zod-openapi";

export const JoinHeaderSchema = z.object({
  Authorization: z.string().openapi({
    example: "Bearer TOKEN",
  }),
});
