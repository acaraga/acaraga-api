import { z } from "@hono/zod-openapi";

export const LocationSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  address: z.string(),
  city: z.string(),
  province: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
});

export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
});

export const EventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),

  imageUrl: z.string().nullable(),
  description: z.string().nullable(),

  locationId: z.string().nullable(),
  categoryId: z.string().nullable(),

  location: LocationSchema.nullable(),
  category: CategorySchema.nullable(),

  dateTimeStart: z.string(),
  dateTimeEnd: z.string(),

  registrationUrl: z.string().nullable(),
  registrationFee: z.number(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export const EventsSchema = z.array(EventSchema);

export const EventCreateSchema = z.object({
  slug: z.string(),
  name: z.string(),
  imageUrl: z.string().optional(),
  description: z.string().optional(),

  locationId: z.string(),
  categoryId: z.string(),

  dateTimeStart: z.string().openapi({
    example: "2026-01-01T00:00:00+07:00",
  }),
  dateTimeEnd: z.string().openapi({
    example: "2026-01-01T00:00:00+07:00",
  }),

  registrationUrl: z.string().optional(),
  registrationFee: z.number(),
});

export const EventUpdateSchema = EventCreateSchema.partial();

export const EventIdParamSchema = z.object({
  id: z.string().openapi({ example: "0923HJK347SDJ9831KOS" }),
});

export const EventSlugParamSchema = z.object({
  slug: z.string().openapi({ example: "summer-festival-2025" }),
});
