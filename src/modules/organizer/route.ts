import { createRoute } from "@hono/zod-openapi";
import { OrganizerEventsResponseSchema } from "./schema";

export const getOrganizerEventsRoute = createRoute({
  method: "get",
  path: "/events",
  tags: ["Organizer"],
  security: [{ BearerAuth: [] }],
  responses: {
    200: {
      description: "Organizer events fetched successfully",
      content: {
        "application/json": {
          schema: OrganizerEventsResponseSchema,
        },
      },
    },
    403: {
      description: "Forbidden",
    },
  },
});
