import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import { eventsRoute } from "./modules/event/routes";
import { categoriesRoute } from "./modules/category/routes";
import { cors } from "hono/cors";

import { userRoute } from "./modules/user/route";
import { authRoute } from "./modules/auth/route";

const app = new OpenAPIHono();

app.use(
  cors({
    origin: (origin) => {
      if (
        origin === "http://localhost:5173" ||
        origin === "https://acaraga.pages.dev" ||
        origin?.endsWith(".acaraga.pages.dev")
      ) {
        return origin;
      }
      return null;
    },
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/events", eventsRoute);
app.route("/categories", categoriesRoute);
app.route("/users", userRoute);
app.route("/auth", authRoute);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "Acaraga API",
    version: "1.0.0",
  },
});

app.get(
  "/",
  Scalar({
    pageTitle: "Acaraga API",
    url: "/openapi.json",
  })
);

export default app;
