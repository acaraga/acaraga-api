import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { EventsSchema } from "./schema";
import { db } from "../../lib/db";

export const eventsRoute = new OpenAPIHono();

eventsRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: { "application/json": { schema: EventsSchema } },
        description: "Get all events",
      },
      404: { description: "No events found" },
    },
  }),
  async (c) => {
    const events = await db.event.findMany({
      include: { category: true },
    });

    const formattedEvents = events.map((event) => {
      return {
        ...event,
      };
    });

    return c.json(formattedEvents);
  }
);
