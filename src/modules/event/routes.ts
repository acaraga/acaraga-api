import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import {
  EventSchema,
  EventsSchema,
  EventCreateSchema,
  EventUpdateSchema,
  EventIdParamSchema,
  EventSlugParamSchema,
} from "./schema";
import { db } from "../../lib/db";

export const eventsRoute = new OpenAPIHono();

eventsRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        content: {
          "application/json": { schema: EventsSchema },
        },
        description: "Get all events",
      },
    },
  }),
  async (c) => {
    const events = await db.event.findMany({
      include: { category: true, location: true },
    });

    return c.json(events);
  }
);

eventsRoute.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    request: { params: EventSlugParamSchema },
    responses: {
      200: {
        content: {
          "application/json": { schema: EventSchema },
        },
        description: "Get one event by slug",
      },
      404: { description: "Event not found" },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");

    const event = await db.event.findUnique({
      where: { slug },
      include: { category: true, location: true },
    });

    if (!event) {
      return c.json({ message: "Event not found" }, 404);
    }

    return c.json(event);
  }
);

eventsRoute.openapi(
  createRoute({
    method: "post",
    path: "/",
    request: {
      body: {
        content: {
          "application/json": { schema: EventCreateSchema },
        },
      },
    },
    responses: {
      201: {
        description: "Event created successfully",
        content: {
          "application/json": { schema: EventSchema },
        },
      },
    },
  }),
  async (c) => {
    const data = c.req.valid("json");

    const newEvent = await db.event.create({
      data,
      include: { category: true, location: true },
    });

    return c.json(newEvent, 201);
  }
);

eventsRoute.openapi(
  createRoute({
    method: "patch",
    path: "/{id}",
    request: {
      params: EventIdParamSchema,
      body: {
        content: {
          "application/json": { schema: EventUpdateSchema },
        },
      },
    },
    responses: {
      200: {
        description: "Event updated successfully",
        content: {
          "application/json": { schema: EventSchema },
        },
      },
      404: { description: "Event not found" },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");

    const event = await db.event.findUnique({ where: { id } });
    if (!event) {
      return c.json({ message: "Event not found" }, 404);
    }

    const updatedEvent = await db.event.update({
      where: { id },
      data,
      include: { category: true, location: true },
    });

    return c.json(updatedEvent);
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
    const { id } = c.req.valid("param");

    const event = await db.event.findUnique({ where: { id } });
    if (!event) {
      return c.json({ message: "Event not found" }, 404);
    }

    await db.event.delete({ where: { id } });

    return c.json({
      message: `Event with id '${id}' deleted successfully`,
    });
  }
);
