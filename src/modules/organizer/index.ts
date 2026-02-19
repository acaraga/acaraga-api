import { OpenAPIHono } from "@hono/zod-openapi";
import { getOrganizerEventsRoute } from "./route";

import { db } from "../../lib/db";
import { checkAuthorized } from "../auth/middleware";
import { requireRole } from "../../middleware/requireRole";
import type { Env } from "../../types/env";

const organizerRoute = new OpenAPIHono<Env>();
organizerRoute.use("*", checkAuthorized);
organizerRoute.use("*", requireRole("ORGANIZER"));

organizerRoute.openapi(getOrganizerEventsRoute, async (c) => {
  const user = c.get("user");

  const events = await db.event.findMany({
    where: {
      organizerId: user.id,
    },
    include: {
      joinedUsers: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatted = events.map((event) => ({
    id: event.id,
    name: event.name,
    slug: event.slug,
    dateTimeStart: event.dateTimeStart.toISOString(),
    dateTimeEnd: event.dateTimeEnd.toISOString(),
    totalParticipants: event.joinedUsers.length,
  }));

  return c.json({
    message: "Organizer events fetched successfully",
    data: formatted,
  });
});

export default organizerRoute;
