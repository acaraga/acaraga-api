import { z } from "@hono/zod-openapi";

export const EventIdParamSchema = z.object({
  eventId: z.string().openapi({ example: "01KJ6VJ8K49EG41VXTY7PCM3FN" }),
});

export const OrganizerEventSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  imageUrl: z.string().nullable(),
  dateTimeStart: z.string(),
  dateTimeEnd: z.string(),
  registrationUrl: z.string().nullable(),
  registrationFee: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  category: z
    .object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
    })
    .nullable(),
  location: z
    .object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      city: z.string(),
      province: z.string(),
    })
    .nullable(),
  totalParticipants: z.number().openapi({ example: 12 }),
});

export const OrganizerEventsSchema = z.array(OrganizerEventSchema);

export const ParticipantSchema = z.object({
  id: z.string(),
  username: z.string(),
  fullName: z.string(),
  email: z.string(),
  joinedAt: z.string(),
});

export const ParticipantsResponseSchema = z.object({
  event: z.object({
    id: z.string(),
    name: z.string(),
  }),
  totalParticipants: z.number(),
  participants: z.array(ParticipantSchema),
});
