import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { db } from "../../lib/db";
import { checkAuthorized } from "../auth/middleware";
import { JoinHeaderSchema } from "./schema";

export const myEventsRoute = new OpenAPIHono();

// GET my-events
myEventsRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Join Event"],
    summary: "Get all events joined by current user",
    middleware: checkAuthorized,
    request: {
      headers: JoinHeaderSchema,
    },
    responses: {
      200: {
        description: "List of joined events",
      },
      401: { description: "Unauthorized" },
    },
  }),
  async (c) => {
    const user = c.get("user");
    const userId = user.id;

    const myEvents = await db.eventParticipant.findMany({
      where: {
        userId: userId,
      },
      include: {
        event: {
          include: {
            location: true,
          },
        },
      },
    });

    return c.json(
      {
        total: myEvents.length,
        data: myEvents,
      },
      200,
    );
  },
);

// GET my-event for organizer
myEventsRoute.openapi(
  createRoute({
    method: "get",
    path: "/organizer",
    tags: ["Organizer"],
    summary: "Get all events created by organizer with participants",
    middleware: checkAuthorized,
    responses: {
      200: { description: "List of organizer events with participants" },
    },
  }),

  async (c) => {
    const user = c.get("user") as any;
    const userId = user.id;

    const myEvents = await db.event.findMany({
      where: {
        organizerId: userId,
      },
      include: {
        location: true,
        joinedUsers: {
          include: {
            user: true,
          },
        },
      },
    });

    return c.json(
      {
        total: myEvents.length,
        data: myEvents,
      },
      200,
    );
  },
);
