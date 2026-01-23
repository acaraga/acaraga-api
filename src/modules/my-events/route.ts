import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { db } from "../../lib/db";
import { checkAuthorized } from "../auth/middleware";
import { JoinHeaderSchema } from "./schema";

export const myEventsRoute = new OpenAPIHono();

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
      200
    );
  }
);
