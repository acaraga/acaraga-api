import { z } from "@hono/zod-openapi";

export const CategorySchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const CategoriesSchema = z.array(CategorySchema);

export const CategorySlugSchema = z.object({
  categorySlug: z.string().openapi({ example: "category-slug" }),
});

export const CategoryIdParamsSchema = z.object({
  id: z.string().openapi({ example: "01KCK5C8M6A5F2RX34IDSECH" }),
});

export const CategoryCreateSchema = CategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const CategoryUpdateSchema = CategoryCreateSchema.partial().openapi({
  description: "Fields allowed to be updated",
});
