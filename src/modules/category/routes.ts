import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { CategoriesSchema, CategorySchema, CategorySlugSchema } from "./schema";
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
        content: { "application/json": { schema: CategorySchema } },
        description: "Get category by slug",
      },
      404: { description: "Category not found" },
    },
  }),
  async (c) => {
    const { categorySlug } = c.req.valid("param");

    const category = await db.category.findUnique({
      where: { slug: categorySlug },
      select: {
        id: true,
        slug: true,
        name: true,
      },
    });

    if (!category) {
      return c.notFound();
    }

    const events = await db.event.findMany({
      where: { categoryId: category.id },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    const responsePayload = {
      id: category.id,
      slug: category.slug,
      name: category.name,

      events: events.map((event) => ({
        id: event.id,
        name: event.name,
        slug: event.slug,
        dateTimeStart: event.dateTimeStart.toISOString(),
      })),
    };
    return c.json(responsePayload, 200);
  }
);
