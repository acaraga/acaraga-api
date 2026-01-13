import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { z } from "zod";
import { db } from "../../lib/db";

export const joinEventRoute = new OpenAPIHono();

joinEventRoute.openapi(
  createRoute({
    method: "post",
    path: "/{eventId}",
    tags: ["Join Event"],
    summary: "Join an event",
    request: {
      params: z.object({
        eventId: z.string(),
      }),
      body: {
        content: {
          "application/json": {
            schema: z.object({
              userId: z.string(),
            }),
          },
        },
      },
    },
    responses: {
      201: { description: "Successfully joined event" },
      400: { description: "Already joined" },
      404: { description: "Event not found" },
    },
  }),
  async (c) => {
    const { eventId } = c.req.valid("param");
    const { userId } = c.req.valid("json");

    const event = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return c.json({ message: "Event not found" }, 404);
    }

    try {
      await db.eventParticipant.create({
        data: {
          eventId,
          userId,
        },
      });

      return c.json({ message: "Successfully joined event" }, 201);
    } catch {
      return c.json({ message: "You already joined this event" }, 400);
    }
  }
);
