import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { requireOrganizer } from "./middleware";

import {
  EventIdParamSchema,
  OrganizerEventsSchema,
  ParticipantsResponseSchema,
} from "./schema";
import { AuthHeaderSchema } from "../modules/user/schema";
import { db } from "../lib/db";
import { checkAuthorized } from "../modules/auth/middleware";
import { AppEnv } from "../types/env";

export const organizerRoute = new OpenAPIHono<AppEnv>();

organizerRoute.use("*", checkAuthorized, requireOrganizer);

// GET /organizer/events
organizerRoute.openapi(
  createRoute({
    method: "get",
    path: "/events",
    tags: ["Organizer"],
    summary: "Get organizer's events",
    request: { headers: AuthHeaderSchema },
    responses: {
      200: {
        description: "List organizer events",
        content: { "application/json": { schema: OrganizerEventsSchema } },
      },
      401: { description: "Unauthorized" },
      403: { description: "Forbidden: organizer only" },
    },
  }),
  async (c) => {
    const user = c.get("user");

    const events = await db.event.findMany({
      where: { organizerId: user.id },
      orderBy: { dateTimeStart: "asc" },
      include: {
        category: true,
        location: true,
        _count: { select: { joinedUsers: true } },
      },
    });

    return c.json(
      events.map((e) => ({
        id: e.id,
        slug: e.slug,
        name: e.name,
        imageUrl: e.imageUrl ?? null,
        dateTimeStart: e.dateTimeStart.toISOString(),
        dateTimeEnd: e.dateTimeEnd.toISOString(),
        registrationUrl: e.registrationUrl ?? null,
        registrationFee: e.registrationFee,
        createdAt: e.createdAt.toISOString(),
        updatedAt: e.updatedAt.toISOString(),
        category: e.category
          ? { id: e.category.id, slug: e.category.slug, name: e.category.name }
          : null,
        location: e.location
          ? {
              id: e.location.id,
              slug: e.location.slug,
              name: e.location.name,
              city: e.location.city,
              province: e.location.province,
            }
          : null,
        totalParticipants: e._count.joinedUsers,
      })),
    );
  },
);

// GET /organizer/events/{eventId}/participants
organizerRoute.openapi(
  createRoute({
    method: "get",
    path: "/events/{eventId}/participants",
    tags: ["Organizer"],
    summary: "Get participants for an organizer's event",
    request: {
      headers: AuthHeaderSchema,
      params: EventIdParamSchema,
    },
    responses: {
      200: {
        description: "Participants list",
        content: { "application/json": { schema: ParticipantsResponseSchema } },
      },
      401: { description: "Unauthorized" },
      403: { description: "Forbidden: organizer only / not your event" },
      404: { description: "Event not found" },
    },
  }),
  async (c) => {
    const user = c.get("user");
    const { eventId } = c.req.valid("param");

    const event = await db.event.findFirst({
      where: { id: eventId, organizerId: user.id },
      select: {
        id: true,
        name: true,
        joinedUsers: {
          orderBy: { joinedAt: "desc" },
          select: {
            joinedAt: true,
            user: {
              select: {
                id: true,
                username: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!event) {
      return c.json({ message: "Event not found" }, 404);
    }

    return c.json({
      event: { id: event.id, name: event.name },
      totalParticipants: event.joinedUsers.length,
      participants: event.joinedUsers.map((j) => ({
        id: j.user.id,
        username: j.user.username,
        fullName: j.user.fullName,
        email: j.user.email,
        joinedAt: j.joinedAt.toISOString(),
      })),
    });
  },
);
