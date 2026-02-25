import { z } from "@hono/zod-openapi";

export const OrganizerSchema = z.object({
  id: z.string(),
  username: z.string(),
  fullName: z.string(),
  role: z.literal("ORGANIZER"),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const OrganizersSchema = z.array(OrganizerSchema);

export const OrganizerIdParamSchema = z.object({
  id: z.string().openapi({ example: "01KJ6VJ8A0NWXTF482PAJYN9Q5" }),
});
