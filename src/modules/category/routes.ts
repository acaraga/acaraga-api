import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import {
  CategoriesSchema,
  CategoryIdParamsSchema,
  CategorySlugSchema,
  CategoryWithEventsSchema,
} from "./schema";
import { db } from "../../lib/db";

export const categoriesRoute = new OpenAPIHono();

categoriesRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    responses: {
      200: {
        description: "Get all categories",
        content: {
          "application/json": { schema: CategoriesSchema },
        },
      },
    },
  }),
  async (c) => {
    const categories = await db.category.findMany();
    return c.json(categories);
  }
);

categoriesRoute.openapi(
  createRoute({
    method: "get",
    path: "/{categorySlug}",
    request: { params: CategorySlugSchema },
    responses: {
      200: {
        description: "Get category with events",
        content: {
          "application/json": {
            schema: CategoryWithEventsSchema,
          },
        },
      },
      404: { description: "Category not found" },
    },
  }),
  async (c) => {
    const { categorySlug } = c.req.valid("param");

    const category = await db.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) {
      return c.notFound();
    }

    const events = await db.event.findMany({
      where: { categoryId: category.id },
      orderBy: { createdAt: "desc" },
    });

    const responsePayload = {
      id: category.id,
      slug: category.slug,
      name: category.name,
      events: events.map((event) => ({
        id: event.id,
        slug: event.slug,
        name: event.name,
        dateTimeStart: event.dateTimeStart.toISOString(),
      })),
    };

    return c.json(responsePayload, 200);
  }
);

categoriesRoute.openapi(
  createRoute({
    method: "delete",
    path: "/{id}",
    request: { params: CategoryIdParamsSchema },
    responses: {
      200: { description: "Category deleted successfully" },
      404: { description: "Category not found" },
    },
  }),
  async (c) => {
    const { id } = c.req.valid("param");

    const category = await db.category.findUnique({ where: { id } });
    if (!category) {
      return c.json({ message: "Category not found" }, 404);
    }

    await db.category.delete({ where: { id } });

    return c.json({
      message: `Category with id '${id}' deleted successfully`,
    });
  }
);
