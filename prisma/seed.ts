import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seed placeholder ready for GRATISTAY.");
  console.log(
    "Connect this script to src/data/demo-data.ts once the local PostgreSQL database is available.",
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
