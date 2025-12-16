import { z } from "@hono/zod-openapi";

export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CategoryWithEventsSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  events: z.array(
    z.object({
      id: z.string(),
      slug: z.string(),
      name: z.string(),
      dateTimeStart: z.string(),
    })
  ),
});

export const CategoriesSchema = z.array(CategorySchema);

export const CategorySlugSchema = z.object({
  categorySlug: z.string().openapi({ example: "category-slug" }),
});
