import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import {
  EventSchema,
  EventsSchema,
  EventCreateSchema,
  EventUpdateSchema,
  EventIdParamSchema,
  EventSlugParamSchema,
} from "./schema";
import { db } from "../../lib/db";
import { checkAuthorized } from "../auth/middleware";
export const eventsRoute = new OpenAPIHono();

// ==========================================
// 1. GET ALL EVENTS
// ==========================================
eventsRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Events"],
    summary: "Get all events",
    responses: {
      200: {
        content: {
          "application/json": { schema: EventsSchema },
        },
        description: "Get all events",
      },
    },
  }),
  async (c) => {
    const events = await db.event.findMany({
      include: { category: true, location: true },
    });

    return c.json(events);
  },
);

// ==========================================
// 2. GET EVENT BY SLUG
// ==========================================
eventsRoute.openapi(
  createRoute({
    method: "get",
    path: "/{slug}",
    tags: ["Events"],
    summary: "Get event by slug",
    request: { params: EventSlugParamSchema },
    responses: {
      200: {
        content: {
          "application/json": { schema: EventSchema },
        },
        description: "Get one event by slug",
      },
      404: { description: "Event not found" },
    },
  }),
  async (c) => {
    const { slug } = c.req.valid("param");

    const event = await db.event.findUnique({
      where: { slug },
      include: {
        category: true,
        location: true,
        joinedUsers: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                fullName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!event) {
      return c.json({ message: "Event not found" }, 404);
    }

    const joined = {
      total: event.joinedUsers.length,
      users: event.joinedUsers.map((j) => ({
        ...j.user,
        joinedAt: j.joinedAt,
      })),
    };

    const { joinedUsers, ...eventData } = event;

    return c.json({
      ...eventData,
      joined,
    });
  },
);

// ==========================================
// 3. CREATE NEW EVENT (VERSI TERBARU - TUGAS ENDI)
// ==========================================
eventsRoute.openapi(
  createRoute({
    method: "post",
    path: "/",
    tags: ["Events"],
    summary: "Create new event",
    // middleware: [checkAuthorized] as const, // Proteksi Token JWT
    request: {
      body: {
        content: {
          "application/json": { schema: EventCreateSchema },
        },
      },
    },
    responses: {
      201: {
        description: "Event created successfully",
        content: {
          "application/json": { schema: EventSchema },
        },
      },
      401: { description: "Unauthorized - Harus login dulu" },
      403: { description: "Forbidden - Hanya Admin" }
    },
  }),
  async (c) => {
    const data = c.req.valid("json");
    
    // Mengambil data user dari context middleware
    const user = c.get("user") as unknown as { id: string, role: string };

    // Validasi Role: Memastikan user adalah ADMIN
    if (!user || user.role !== "ADMIN") {
      return c.json({ message: "Hanya Admin yang dapat membuat event" }, 403);
    }

    // Eksekusi Simpan ke DB dengan organizerId
    const newEvent = await db.event.create({
      data: {
        ...data,
        organizerId: user.id, // Mengaitkan ke ID pembuat
      },
      include: {
        category: true,
        location: true,
      },
    });

    return c.json(newEvent, 201);
  }
);

/* KODE LAMA (DI-NONAKTIFKAN AGAR TIDAK DUPLIKAT):
  
  eventsRoute.openapi(
    createRoute({
      method: "post",
      path: "/",
      tags: ["Events"],
      summary: "Create new event",
      request: {
        body: {
          content: {
            "application/json": { schema: EventCreateSchema },
          },
        },
      },
      responses: {
        201: {
          description: "Event created successfully",
          content: {
            "application/json": { schema: EventSchema },
          },
        },
      },
    }),
    async (c) => {
      const data = c.req.valid("json");

      const newEvent = await db.event.create({
        data,
        include: {
          category: true,
          location: true,
        },
      });

      return c.json(newEvent, 201);
    },
  );
*/

// ==========================================
// 4. UPDATE EVENT BY ID
// ==========================================
eventsRoute.openapi(
  createRoute({
    method: "patch",
    path: "/{id}",
    tags: ["Events"],
    summary: "Update event by Id",
    middleware: [checkAuthorized] as const, // Tambahkan proteksi jika perlu
    request: {
      params: EventIdParamSchema,
      body: {
        content: {
          "application/json": { schema: EventUpdateSchema },
        },
      },
    },
    responses: {
      200: {
        description: "Event updated successfully",
        content: {
          "application/json": { schema: EventSchema },
        },
      },
      404: { description: "Event not found" },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");
    const data = c.req.valid("json");

    const event = await db.event.findUnique({ where: { id } });
    if (!event) {
      return c.json({ message: "Event not found" }, 404);
    }

    const updatedEvent = await db.event.update({
      where: { id },
      data,
      include: { category: true, location: true },
    });

    return c.json(updatedEvent);
  },
);

// ==========================================
// 5. DELETE EVENT
// ==========================================
eventsRoute.openapi(
  createRoute({
    method: "delete",
    path: "/{id}",
    tags: ["Events"],
    summary: "Delete event",
    middleware: [checkAuthorized] as const, // Tambahkan proteksi jika perlu
    request: { params: EventIdParamSchema },
    responses: {
      200: { description: "Event deleted successfully" },
      404: { description: "Event not found" },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");

    const event = await db.event.findUnique({ where: { id } });
    if (!event) {
      return c.json({ message: "Event not found" }, 404);
    }

    await db.event.delete({ where: { id } });

    return c.json({
      message: `Event with id '${id}' deleted successfully`,
    });
  },
);