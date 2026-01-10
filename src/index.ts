import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import { eventsRoute } from "./modules/event/routes";
import { categoriesRoute } from "./modules/category/routes";
import { cors } from "hono/cors";

import { userRoute } from "./modules/user/route";
import { authRoute } from "./modules/auth/route";

const app = new OpenAPIHono();

app.use(cors());

app.route("/events", eventsRoute);
app.route("/categories", categoriesRoute);
app.route("/users", userRoute);
app.route("/auth", authRoute);
app.route("/join-events", joinEventsRoute);

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
