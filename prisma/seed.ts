import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { dataEvents } from "./data/events";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const db = new PrismaClient({ adapter });

async function main() {
  for (const event of dataEvents) {
    const upsertedEvent = await db.event.upsert({
      where: { slug: event.slug },
      update: event,
      create: event,
    });

    console.log(`🏃 Event: ${upsertedEvent.name}`);
  }

  console.log(
    "Seeding complete! Acaraga event data has been successfully added."
  );
}

main()
  .catch((e) => {
    console.error("Error seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
