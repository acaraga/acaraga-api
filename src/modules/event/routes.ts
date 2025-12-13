import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import {
  EventCreateSchema,
  EventIdParamSchema,
  EventSchema,
  EventSlugParamSchema,
  EventsSchema,
  EventUpdateSchema,
} from "./schema";
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
        content: { "application/json": { schema: EventSchema } },
        description: "Get one event by Slug",
      },
      400: { description: "Event not found" },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");

    const event = await db.event.findUnique({
      where: { slug },
      include: { category: true, location: true },
    });

    if (!event) {
      return c.json({ message: "Event not found" }, 400);
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
      const { location, ...rest } = c.req.valid("json");

      const newEvent = await db.event.create({
        data: {
          ...rest,
          locationId: location,
        },
      });

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

eventsRoute.openapi(
  createRoute({
    method: "patch",
    path: "/{id}",
    request: {
      params: EventIdParamSchema,
      body: {
        content: { "application/json": { schema: EventUpdateSchema } },
      },
    },
    responses: {
      200: {
        description: "Product updated successfully",
        content: {
          "application/json": {
            schema: EventSchema,
          },
        },
      },
      404: {
        description: "Product not found",
      },
      400: {
        description: "Invalid request body",
      },
    },
  }),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const { location, ...rest } = await c.req.valid("json");

      const event = await db.event.findUnique({ where: { id } });
      if (!event) {
        return c.json({ message: "Event not found" }, 404);
      }

      const updatedEvent = await db.event.update({
        where: { id },
        data: {
          ...rest,
          ...(location && { locationId: location }),
        },
      });

      return c.json({
        message: `Event with id '${id}' updated successfully`,
        updatedEvent,
      });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to update product" }, 400);
    }
  }
);
