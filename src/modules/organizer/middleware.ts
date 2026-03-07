import { createMiddleware } from "hono/factory";
import type { AppEnv } from "../../types/env";

export const requireOrganizer = createMiddleware<AppEnv>(async (c, next) => {
  const user = c.get("user");
  if (!user) return c.json({ message: "Unauthorized" }, 401);

  if (user.role !== "ORGANIZER") {
    return c.json({ message: "Forbidden: organizer only" }, 403);
  }

  await next();
});


export const requireUser = createMiddleware<AppEnv>(async (c, next) => {
  const user = c.get("user");
  if (!user) return c.json({ message: "Unauthorized" }, 401);

  if (user.role !== "USER") {
    return c.json({ message: "Forbidden: user only" }, 403);
  }
  
  await next();
});
