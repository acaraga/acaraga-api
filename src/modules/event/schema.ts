import { z } from "@hono/zod-openapi";
import {
  EventParticipantUserSchema,
  JoinedInfoSchema,
} from "../join-events/schema";

export const LocationSchema = z.object({
  id: z.string().openapi({ example: "01KCK0H8A6M5R9B2Q7CV094" }),
  slug: z.string().openapi({ example: "jakarta-convention-center" }),
  name: z.string().openapi({ example: "Jakarta Convention Center" }),
  address: z.string().openapi({ example: "Jl. Gatot Subroto" }),
  city: z.string().openapi({ example: "Jakarta" }),
  province: z.string().openapi({ example: "DKI Jakarta" }),
  latitude: z.number().nullable().openapi({ example: -6.218 }),
  longitude: z.number().nullable().openapi({ example: 106.802 }),
});

export const CategorySchema = z.object({
  id: z.string().openapi({ example: "01KCK0J2M9A7F5B6R8QXYHD" }),
  slug: z.string().openapi({ example: "running" }),
  name: z.string().openapi({ example: "Running" }),
});

export const EventSchema = z.object({
  id: z.string().openapi({ example: "01KCK2P8M4A7F5R2B6X9YHDQ" }),
  slug: z.string().openapi({ example: "jakarta-running-2026" }),
  name: z.string().openapi({ example: "Jakarta running 2026" }),

  participants: z.array(EventParticipantUserSchema).optional(),
  totalParticipants: z.number().optional(),

  imageUrl: z.string().nullable().openapi({
    example: "https://cdn.uploadcare.com/4DHAG67-000",
  }),

  description: z.string().nullable().openapi({
    example: "Annual international running event",
  }),

  facilities: z
    .string()
    .nullable()
    .openapi({
      example: `- Bespoke finisher's medal 
    - Water stations`,
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

  joined: JoinedInfoSchema.optional(),
});

export const EventsSchema = z.array(EventSchema);

export const EventCreateSchema = z.object({
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

  facilities: z.string().optional().openapi({
    example: '["Jersey","Medal","BIB","Timing Chip","Refreshment"]',
  }),
});

export const EventUpdateSchema = EventCreateSchema.partial();

export const EventIdParamSchema = z.object({
  id: z.string().openapi({ example: "01KCK5C8M6A5F2R9B7X4YHD" }),
});

export const EventSlugParamSchema = z.object({
  slug: z.string().openapi({ example: "summer-festival-2026" }),
});



export const CreateEventBodySchema = z.object({
  name: z.string().min(3).openapi({ example: "Borobudur Marathon 2026" }),
  slug: z.string().min(3).openapi({ example: "borobudur-marathon-2026" }),
  description: z.string().optional().openapi({ example: "Event lari tahunan terbesar di Magelang." }),
  registrationFee: z.number().min(0).openapi({ example: 150000 }),
  dateTimeStart: z.string().datetime().openapi({ example: "2026-11-15T06:00:00Z" }), 
  categoryId: z.string().openapi({ example: "01HQ... (ID Kategori)" }),
  locationId: z.string().openapi({ example: "01HQ... (ID Lokasi)" }),
});