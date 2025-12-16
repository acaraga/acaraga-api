import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import { eventsRoute } from "./modules/event/routes";
import { categoriesRoute } from "./modules/category/routes";
import { cors } from "hono/cors";

const app = new OpenAPIHono();

app.use(
  cors({
    origin: ["https://acaraga.pages.dev", "http://localhost:5173"],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/events", eventsRoute);
app.route("/categories", categoriesRoute);

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
