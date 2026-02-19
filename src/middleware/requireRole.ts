import { createMiddleware } from "hono/factory";

export const requireRole = (...roles: string[]) =>
  createMiddleware(async (c, next) => {
    const user = c.get("user");

    if (!user) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    if (!roles.includes(user.role)) {
      return c.json({ message: "Forbidden" }, 403);
    }

    await next();
  });
