import { z } from "@hono/zod-openapi";

export const JoinedUserSchema = z.object({
  id: z.string().openapi({ example: "01KETWFC6XHDFA4RCE1NP5X85Q" }),
  username: z.string().openapi({ example: "example" }),
  fullName: z.string().openapi({ example: "Example User" }),
  email: z.string().openapi({ example: "example@example.com" }),
  joinedAt: z.string().openapi({ example: "2026-01-13T08:05:20.479Z" }),
});

export const JoinedInfoSchema = z.object({
  total: z.number().openapi({ example: 2 }),
  users: z.array(JoinedUserSchema),
});

export const EventParticipantUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  fullName: z.string(),
  email: z.string(),
});
