import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { db } from "../../lib/db";
import {
  UserSchema,
  RegisterUserSchema,
  LoginResponseSchema,
  LoginUserSchema,
} from "../user/schema";

import { hashPassword, verifyPassword } from "../../lib/password";
import { checkAuthorized } from "./middleware";
import { signToken } from "../../lib/token";

export const authRoute = new OpenAPIHono();

// POST register
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/register",
    request: {
      body: { content: { "application/json": { schema: RegisterUserSchema } } },
    },
    responses: {
      201: {
        description: "Registered new user",
        content: { "application/json": { schema: UserSchema } },
      },
      400: {
        description: "Failed to register new user",
      },
    },
  }),

  async (c) => {
    const body = c.req.valid("json");

    try {
      const hash = await hashPassword(body.password);

      const user = await db.user.create({
        data: {
          username: body.username,
          email: body.email,
          fullName: body.fullName,
          password: { create: { hash } },
        },
      });

      return c.json(user, 201);
    } catch (error) {
      return c.json(
        {
          message: "Username or email already exist",
        },
        400
      );
    }
  }
);

// POST /login
authRoute.openapi(
  createRoute({
    method: "post",
    path: "/login",
    request: {
      body: { content: { "application/json": { schema: LoginUserSchema } } },
    },
    responses: {
      200: {
        content: { "text/plain": { schema: LoginResponseSchema } },
        description: "Successfully Logged In",
      },
      400: { description: "Failed to Login" },
    },
  }),
  async (c) => {
    const body = c.req.valid("json");

    try {
      const user = await db.user.findUnique({
        where: { email: body.email },
        include: { password: true },
      });

      if (!user) {
        return c.json({ message: "User not found" }, 404);
      }

      if (!user.password?.hash) {
        return c.json({ message: "User doesn't have a password" }, 400);
      }

      const token = await signToken(user.id);

      return c.text(token);
    } catch (error) {
      return c.json({ message: "Email or password is incorrect" }, 400);
    }
  }
);

// GET auth/me
authRoute.openapi(
  createRoute({
    method: "get",
    path: "/me",
    middleware: checkAuthorized,
    responses: {
      200: {
        description: "Get authenticated user",
        content: { "application/json": { schema: UserSchema } },
      },
    },
  }),
  async (c) => {
    const user = c.get("user");

    return c.json(user);
  }
);
