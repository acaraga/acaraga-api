import { z } from "@hono/zod-openapi";

export const EventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  location: z.string(),
  categoryId: z.string(),
  dateTimeStart: z.string(),
  dateTimeEnd: z.string(),
  registrationUrl: z.string(),
  registrationFee: z.number(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export const EventsSchema = z.array(EventSchema);

export const EventCreateSchema = z.object({
  slug: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  location: z.string(),
  categoryId: z.string(),
  dateTimeStart: z.string().openapi({
    example: "2025-12-06T00:00:00+07:00",
  }),
  dateTimeEnd: z.string().openapi({
    example: "2025-12-06T00:00:00+07:00",
  }),
  registrationUrl: z.string(),
  registrationFee: z.number(),
});

export const EventIdParamSchema = z.object({
  id: z.string().openapi({ example: "0923HJK347SDJ9831KOS" }),
});
