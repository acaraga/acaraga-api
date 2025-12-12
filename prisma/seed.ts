import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { dataEvents } from "./data/events";
import { dataCategories } from "./data/categories";
import { dataLocations } from "./data/locations";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const db = new PrismaClient({ adapter });

async function seedCategories() {
  console.log("Seeding Categories...");
  for (const category of dataCategories) {
    await db.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category,
    });
    console.info(`  ✅ Seeded Category: ${category.name}`);
  }
}

async function seedLocations() {
  for (const location of dataLocations) {
    await db.location.upsert({
      where: { slug: location.slug },
      update: { ...location },
      create: { ...location },
    });
  }
}

async function seedEvents() {
  console.log("Seeding Events...");
  for (const dataEvent of dataEvents) {
    const { categorySlug, locationSlug, ...eventBase } = dataEvent;

    try {
      const category = await db.category.findUniqueOrThrow({
        where: { slug: categorySlug.toLowerCase() },
      });

      const location = await db.location.findUnique({
        where: { slug: dataEvent.locationSlug },
      });

      if (!location) {
        console.warn(
          `Location with slug '${dataEvent.locationSlug}' not found.`
        );
        continue;
      }

      const upsertQuery = {
        ...eventBase,
        categoryId: category.id,
        locationId: location.id,
      };

      const event = await db.event.upsert({
        where: { slug: dataEvent.slug },
        update: upsertQuery,
        create: upsertQuery,
      });

      console.log(`🏃 Seeded Event: ${event.name}`);
    } catch (e) {
      console.error("Fatal database error during event seeding:", e);
      throw e;
    }
  }
}

async function main() {
  await seedCategories();
  await seedLocations();
  await seedEvents();
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
