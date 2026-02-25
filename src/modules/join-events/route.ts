import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { db } from "../../lib/db";
import { checkAuthorized } from "../auth/middleware";
import { JoinEventSchema, JoinHeaderSchema } from "./schema";

export const joinEventRoute = new OpenAPIHono();

// GET CHECK JOIN STATUS
joinEventRoute.openapi(
  createRoute({
    method: "get",
    path: "/check/{eventId}", // Path untuk nge-cek status
    tags: ["Join Event"],
    summary: "Check if user already joined an event",
    middleware: checkAuthorized,
    request: {
      params: z.object({
        eventId: z.string().openapi({ example: "event_id_123" }),
      }),
    },
    responses: {
      200: { description: "Join status" },
      401: { description: "Unauthorized" },
    },
  }),
  async (c) => {
    const { eventId } = c.req.valid("param");
    const user = c.get("user") as any;
    const userId = user.id;

    const participant = await db.eventParticipant.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    return c.json({ isJoined: !!participant }, 200); // !! mengubah objek/null jadi boolean true/false
  },
);

// POST JOIN EVENT
joinEventRoute.openapi(
  createRoute({
    method: "post",
    path: "/",
    tags: ["Join Event"],
    summary: "Join an event",
    middleware: checkAuthorized,
    request: {
      headers: JoinHeaderSchema,
      body: {
        content: {
          "application/json": {
            schema: JoinEventSchema,
          },
        },
      },
    },
    responses: {
      201: { description: "Successfully joined event" },
      400: { description: "User already joined event" },
      401: { description: "Unauthorized" },
      404: { description: "Event not found" },
    },
  }),
  async (c) => {
    const { eventId } = c.req.valid("json");

    const user = c.get("user");
    const userId = user.id;

    const event = await db.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return c.json({ message: "Event not found" }, 404);
    }

    const alreadyJoined = await db.eventParticipant.findFirst({
      where: { userId, eventId },
    });

    if (alreadyJoined) {
      return c.json({ message: "User already joined this event" }, 400);
    }

    await db.eventParticipant.create({
      data: {
        userId,
        eventId,
      },
    });

    return c.json({ message: "Successfully joined event" }, 201);
  },
);
