import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { CategorySchema, CategorySlugSchema } from "./schema";
import { db } from "../../lib/db";

export const categoriesRoute = new OpenAPIHono();

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
    const { categorySlug } = c.req.valid("param"); // 1. Cari kategori (wajib ada untuk melanjutkan)

    const category = await db.category.findUnique({
      where: { slug: categorySlug },
      select: {
        id: true,
        slug: true,
        name: true, // Ambil detail kategori
      },
    });

    if (!category) {
      return c.notFound(); // ✅ Jalur 404 (Category not found)
    }

    const events = await db.event.findMany({
      where: { categoryId: category.id },
      include: { category: true }, // Include category (walaupun sudah tahu, ini bagus untuk konsistensi)
      orderBy: { createdAt: "desc" },
    }); // Jika Anda ingin endpoint ini mengembalikan Kategori + Events terkait:

    const responsePayload = {
      // Ambil data dari object category yang sudah diambil di awal
      id: category.id,
      slug: category.slug,
      name: category.name,
      // Tambahkan list events yang sudah diformat
      events: events.map((event) => ({
        // 🚨 PENTING: Lakukan mapping/formatting untuk menghindari error tipe/Date
        id: event.id,
        name: event.name,
        slug: event.slug,
        dateTimeStart: event.dateTimeStart.toISOString(), // Konversi Date ke String
        // ... field lain yang dibutuhkan oleh skema Anda
      })),
    };

    // 🌟 Wajib: Kembalikan Response di akhir jalur sukses
    return c.json(responsePayload, 200); // ✅ Jalur 200 (Success)
  }
);
