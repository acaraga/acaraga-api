import { z } from "@hono/zod-openapi";

export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CategorySlugSchema = z.object({
  categorySlug: z.string().openapi({ example: "category-slug" }),
});
