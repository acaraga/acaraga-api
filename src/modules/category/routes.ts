import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import {
  CategoriesSchema,
  CategoryCreateSchema,
  CategoryIdParamsSchema,
  CategorySchema,
  CategorySlugSchema,
  CategoryUpdateSchema,
} from "./schema";
import { db } from "../../lib/db";

export const categoriesRoute = new OpenAPIHono();

categoriesRoute.openapi(
  createRoute({
    method: "get",
    path: "/",
    tags: ["Categories"],
    summary: "Get all categories",
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
    tags: ["Categories"],
    summary: "Get category by slug",
    request: { params: CategorySlugSchema },
    responses: {
      200: {
        description: "Get category with events",
        content: {
          "application/json": {
            schema: CategorySchema,
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
    method: "post",
    path: "/",
    tags: ["Categories"],
    summary: "Create new category",
    request: {
      body: {
        content: { "application/json": { schema: CategoryCreateSchema } },
      },
    },
    responses: {
      201: {
        description: "Category created successfully",
        content: { "application/json": { schema: CategorySchema } },
      },
      400: { description: "Invalid request" },
    },
  }),
  async (c) => {
    try {
      const data = await c.req.valid("json");
      const newCategory = await db.category.create({ data });
      return c.json(newCategory, 201);
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to create category" }, 400);
    }
  }
);

categoriesRoute.openapi(
  createRoute({
    method: "patch",
    path: "/{id}",
    tags: ["Categories"],
    summary: "Update category",
    request: {
      params: CategoryIdParamsSchema,
      body: {
        content: { "application/json": { schema: CategoryUpdateSchema } },
      },
    },
    responses: {
      200: {
        description: "Category updated successfully",
        content: {
          "application/json": {
            schema: CategorySchema,
          },
        },
      },
      404: {
        description: "Category not found",
      },
      400: {
        description: "Invalid request body",
      },
    },
  }),
  async (c) => {
    try {
      const { id } = c.req.valid("param");
      const data = await c.req.valid("json");

      const category = await db.category.findUnique({ where: { id } });
      if (!category) {
        return c.json({ message: "Category not found" }, 404);
      }

      const updatedCategory = await db.category.update({
        where: { id },
        data,
      });

      return c.json({
        message: `Category with id '${id}' updated successfully`,
        updatedCategory,
      });
    } catch (error) {
      console.error(error);
      return c.json({ error: "Failed to update category" }, 400);
    }
  }
);

categoriesRoute.openapi(
  createRoute({
    method: "delete",
    path: "/{id}",
    tags: ["Categories"],
    summary: "Delete category",
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
