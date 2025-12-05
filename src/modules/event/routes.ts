import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { EventCreateSchema, EventIdParamSchema, EventsSchema } from "./schema";
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
      return { event };
    });

    return c.json(formattedEvents);
  }
);

eventsRoute.openapi(
  createRoute({
    method: "post",
    path: "/",
    request: {
      body: {
        content: { "application/json": { schema: EventCreateSchema } },
      },
    },
    responses: {
      201: {
        description: "Event created successfully",
        content: { "application/json": { schema: EventsSchema } },
      },
      400: { description: "Invalid request" },
    },
  }),
  async (c) => {
    try {
      const data = await c.req.valid("json");

      const newEvent = await db.event.create({ data });

      return c.json(newEvent, 201);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to create event" }, 400);
    }
  }
);

eventsRoute.openapi(
  createRoute({
    method: "delete",
    path: "/{id}",
    request: { params: EventIdParamSchema },
    responses: {
      200: { description: "Event deleted successfully" },
      404: { description: "Event not found" },
    },
  }),
  async (c) => {
    try {
      const { id } = c.req.valid("param");

      const event = await db.event.findUnique({ where: { id } });

      if (!event) {
        return c.json({ message: "Event not found" }, 404);
      }

      await db.event.delete({ where: { id } });

      return c.json({
        message: `Event with id '${id}' deleted successfully`,
        deletedEvent: event,
      });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to delete product" }, 400);
    }
  }
);
