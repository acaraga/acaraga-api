import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    title: "Acara Olahraga REST API",
  });
});

export default app;
