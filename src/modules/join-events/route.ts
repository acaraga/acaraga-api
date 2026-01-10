import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { db } from "../../lib/db";
import { EventSchema } from "../event/schema";

import { JoinEventCreateSchema } from "./schema";

export const eventsRoute = new OpenAPIHono();

eventsRoute.openapi(
  createRoute({
    method: "post",
    path: "/",
    tags: ["Join Events"],
    summary: "Join new event",
    request: {
      body: {
        content: {
          "application/json": { schema: JoinEventCreateSchema },
        },
      },
    },
    responses: {
      201: {
        description: "Event joined successfully",
        content: {
          "application/json": { schema: EventSchema },
        },
      },
    },
  }),
  async (c) => {
    const data = c.req.valid("json");

    const JoinEvent = await db.event.create({
      data,
      include: { category: true, location: true },
    });

    return c.json(JoinEvent, 201);
  }
);
