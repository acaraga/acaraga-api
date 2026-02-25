import { createRoute, OpenAPIHono } from "@hono/zod-openapi";

import { db } from "../../lib/db";
import { UserIdParamSchema, UserSchema, UsersSchema } from "./schema";

export const userRoute = new OpenAPIHono();

// GET all users (role USER only)
userRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Users"],
    summary: "Get all users",
    responses: {
      200: {
        description: "Get all users",
        content: { "application/json": { schema: UsersSchema } },
      },
    },
  }),
  async (c) => {
    const userList = await db.user.findMany({
      where: { role: "USER" },
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return c.json(
      userList.map((userItem) => ({
        id: userItem.id,
        username: userItem.username,
        fullName: userItem.fullName,
        role: "USER" as const,
        createdAt: userItem.createdAt.toISOString(),
        updatedAt: userItem.updatedAt.toISOString(),
      })),
    );
  },
);

// GET user by id (role USER only)
userRoute.openapi(
  createRoute({
    method: "get",
    path: "/{id}",
    tags: ["Users"],
    summary: "Get user by Id",
    request: { params: UserIdParamSchema },
    responses: {
      200: {
        description: "Get one user by ID",
        content: { "application/json": { schema: UserSchema } },
      },
      404: { description: "User not found" },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");

    const userData = await db.user.findFirst({
      where: { id, role: "USER" },
      select: {
        id: true,
        username: true,
        fullName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userData) return c.notFound();

    return c.json({
      id: userData.id,
      username: userData.username,
      fullName: userData.fullName,
      role: "USER" as const,
      createdAt: userData.createdAt.toISOString(),
      updatedAt: userData.updatedAt.toISOString(),
    });
  },
);
