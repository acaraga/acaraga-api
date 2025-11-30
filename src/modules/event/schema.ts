import { z } from "@hono/zod-openapi";

export const EventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  imageUrl: z.string().nullable(),
  description: z.string().nullable(),
  location: z.string().nullable(),
  categoryId: z.string().nullable(),
  dateTimeStart: z.string(),
  dateTimeEnd: z.string(),
  registrationUrl: z.string(),
  registrationFee: z.number(),

  createdAt: z.date(),
  updatedAt: z.date(),
});

export const EventsSchema = z.array(EventSchema);
