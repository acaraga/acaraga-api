import { z } from "@hono/zod-openapi";
import { CategorySchema, LocationSchema } from "../event/schema";

export const JoinEventSchema = z.object({
  id: z.string().openapi({ example: "01KCK2P8M4A7F5R2B6X9YHDQ" }),
  slug: z.string().openapi({ example: "jakarta-running-2026" }),
  name: z.string().openapi({ example: "Jakarta running 2026" }),

  imageUrl: z.string().nullable().openapi({
    example: "https://cdn.uploadcare.com/4DHAG67-000",
  }),
  description: z.string().nullable().openapi({
    example: "Annual international running event",
  }),

  locationId: z.string().nullable().openapi({ example: -6.218 }),
  categoryId: z.string().nullable().openapi({ example: 106.802 }),

  location: LocationSchema.nullable(),
  category: CategorySchema.nullable(),

  dateTimeStart: z.string().openapi({
    example: "2026-01-01T08:00:00+07:00",
  }),
  dateTimeEnd: z.string().openapi({
    example: "2026-01-01T12:00:00+07:00",
  }),

  registrationUrl: z.string().nullable().openapi({
    example: "https://event.acaraga.com/register",
  }),
  registrationFee: z.number().openapi({ example: 50000 }),

  createdAt: z.string().openapi({
    example: "2025-12-01T10:00:00Z",
  }),
  updatedAt: z.string().openapi({
    example: "2025-12-01T10:00:00Z",
  }),
});

export const JoinEventsSchema = z.array(JoinEventSchema);

export const JoinEventCreateSchema = z.object({
  slug: z.string(),
  name: z.string(),

  imageUrl: z.string().optional(),
  description: z.string().optional(),

  locationId: z.string(),
  categoryId: z.string(),

  dateTimeStart: z.string(),
  dateTimeEnd: z.string(),

  registrationUrl: z.string().optional(),
  registrationFee: z.number(),
});

export const JoinEventUpdateSchema = JoinEventCreateSchema.partial();

export const JoinEventIdParamSchema = z.object({
  id: z.string().openapi({ example: "01KCK5C8M6A5F2R9B7X4YHD" }),
});

export const JoinEventSlugParamSchema = z.object({
  slug: z.string().openapi({ example: "summer-festival-2026" }),
});
