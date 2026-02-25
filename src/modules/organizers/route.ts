import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { db } from "../../lib/db";
import {
  OrganizerIdParamSchema,
  OrganizerSchema,
  OrganizersSchema,
} from "./schema";

export const organizersRoute = new OpenAPIHono();

// GET /organizers
organizersRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Organizers"],
    summary: "Get all organizers",
    responses: {
      200: {
        description: "Get all organizers",
        content: { "application/json": { schema: OrganizersSchema } },
      },
    },
  }),
  async (c) => {
    const organizerList = await db.user.findMany({
      where: { role: "ORGANIZER" },
      select: {
        id: true,
        username: true,
        fullName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return c.json(
      organizerList.map((organizerItem) => ({
        id: organizerItem.id,
        username: organizerItem.username,
        fullName: organizerItem.fullName,
        role: "ORGANIZER" as const,
        createdAt: organizerItem.createdAt.toISOString(),
        updatedAt: organizerItem.updatedAt.toISOString(),
      })),
    );
  },
);

// GET /organizers/{id}
organizersRoute.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    tags: ["Organizers"],
    summary: "Get organizer by Id",
    request: { params: OrganizerIdParamSchema },
    responses: {
      200: {
        description: "Get organizer by ID",
        content: { "application/json": { schema: OrganizerSchema } },
      },
      404: { description: "Organizer not found" },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");

    const organizerData = await db.user.findFirst({
      where: { id, role: "ORGANIZER" },
      select: {
        id: true,
        username: true,
        fullName: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!organizerData) return c.notFound();

    return c.json({
      id: organizerData.id,
      username: organizerData.username,
      fullName: organizerData.fullName,
      role: "ORGANIZER" as const,
      createdAt: organizerData.createdAt.toISOString(),
      updatedAt: organizerData.updatedAt.toISOString(),
    });
  },
);
