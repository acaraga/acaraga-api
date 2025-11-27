import { Hono } from "hono";
import { prisma } from "./lib/db";

const app = new Hono();

app.get("/", (c) => {
  return c.json({
    title: "Acara Olahraga REST API",
  });
});

app.get("/events", async (c) => {
  const events = await prisma.event.findMany();

  return c.json(events);
});
export default app;
