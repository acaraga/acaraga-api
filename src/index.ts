import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";

import { eventsRoute } from "./modules/event/routes";
import { categoriesRoute } from "./modules/category/routes";
import { cors } from "hono/cors";

import { userRoute } from "./modules/user/route";
import { authRoute } from "./modules/auth/route";
import { joinEventRoute } from "./modules/join-events/route";
import { myEventsRoute } from "./modules/my-events/route";
import organizerRoute from "./modules/organizer";

const app = new OpenAPIHono();

app.use(cors());

app.route("/events", eventsRoute);
app.route("/categories", categoriesRoute);
app.route("/users", userRoute);
app.route("/auth", authRoute);
app.route("/join-event", joinEventRoute);
app.route("/my-events", myEventsRoute);
app.route("/organizer", organizerRoute);

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
  }),
);

export default app;
