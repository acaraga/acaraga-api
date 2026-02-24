import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

import { dataUsers } from "./data/users";
import { dataCategories } from "./data/categories";
import { dataEvents } from "./data/events";
import { dataLocations } from "./data/locations";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const db = new PrismaClient({ adapter });

async function seedEvents() {
  console.log("Seeding Events...");

  for (const dataEvent of dataEvents) {
    const { categorySlug, locationSlug, organizerUsername, ...eventBase } =
      dataEvent;

    try {
      const category = await db.category.findUniqueOrThrow({
        where: { slug: categorySlug.toLowerCase() },
      });

      const location = await db.location.findUnique({
        where: { slug: locationSlug },
      });

      if (!location) {
        console.warn(`⚠️ Location with slug '${locationSlug}' not found.`);
        continue;
      }

      const organizer = await db.user.findUnique({
        where: { username: organizerUsername },
        select: { id: true, username: true, role: true },
      });

      if (!organizer) {
        throw new Error(
          `Organizer '${organizerUsername}' not found for event '${dataEvent.slug}'. Seed users dulu / cek username.`,
        );
      }

      if (organizer.role !== "ORGANIZER") {
        throw new Error(
          `User '${organizerUsername}' found but role is '${organizer.role}'. Must be ORGANIZER.`,
        );
      }

      const upsertQuery = {
        ...eventBase,
        categoryId: category.id,
        locationId: location.id,
        organizerId: organizer.id,
      };

      const event = await db.event.upsert({
        where: { slug: dataEvent.slug },
        update: upsertQuery,
        create: upsertQuery,
      });

      console.log(
        `🏃 Seeded Event: ${event.name} (Organizer: ${organizer.username})`,
      );
    } catch (e) {
      console.error("❌ Fatal database error during event seeding:", e);
      throw e;
    }
  }
}

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

async function seedUsers() {
  console.log("Seeding Users...");

  for (const user of dataUsers) {
    await db.user.upsert({
      where: { email: user.email },
      update: {
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
      create: {
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        password: {
          create: {
            hash: user.passwordHash,
          },
        },
      },
    });

    console.log(`👤 Seeded User: ${user.username} (${user.role})`);
  }
}

async function main() {
  await seedUsers();
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
