import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { requireOrganizer } from "./middleware";
import {
  EventIdParamSchema,
  OrganizerEventsSchema,
  ParticipantsResponseSchema,
} from "./schema";
import { AuthHeaderSchema } from "../user/schema";
import { db } from "../../lib/db";
import { checkAuthorized } from "../auth/middleware";
import type { AppEnv } from "../../types/env";

export const organizerRoute = new OpenAPIHono<AppEnv>();

organizerRoute.use("*", checkAuthorized, requireOrganizer);

// GET /organizer/events
organizerRoute.openapi(
  createRoute({
    method: "get",
    path: "/events",
    tags: ["Organizer"],
    summary: "Get organizer events",
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
      events.map((eventItem) => ({
        id: eventItem.id,
        slug: eventItem.slug,
        name: eventItem.name,
        imageUrl: eventItem.imageUrl ?? null,
        dateTimeStart: eventItem.dateTimeStart.toISOString(),
        dateTimeEnd: eventItem.dateTimeEnd.toISOString(),
        registrationUrl: eventItem.registrationUrl ?? null,
        registrationFee: eventItem.registrationFee,
        createdAt: eventItem.createdAt.toISOString(),
        updatedAt: eventItem.updatedAt.toISOString(),
        category: eventItem.category
          ? {
              id: eventItem.category.id,
              slug: eventItem.category.slug,
              name: eventItem.category.name,
            }
          : null,
        location: eventItem.location
          ? {
              id: eventItem.location.id,
              slug: eventItem.location.slug,
              name: eventItem.location.name,
              city: eventItem.location.city,
              province: eventItem.location.province,
            }
          : null,
        totalParticipants: eventItem._count.joinedUsers,
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
    summary: "Get participants for an organizer event",
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
      participants: event.joinedUsers.map((participant) => ({
        id: participant.user.id,
        username: participant.user.username,
        fullName: participant.user.fullName,
        email: participant.user.email,
        joinedAt: participant.joinedAt.toISOString(),
      })),
    });
  },
);
