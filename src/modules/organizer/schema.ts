import { z } from "@hono/zod-openapi";

export const OrganizerEventSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  dateTimeStart: z.string(),
  dateTimeEnd: z.string(),
  totalParticipants: z.number(),
});

export const OrganizerEventsResponseSchema = z.object({
  message: z.string(),
  data: z.array(OrganizerEventSchema),
});
