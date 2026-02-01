import { PrismaClient } from "@/app/generated/prisma/client";
import { adapter } from "@/shared/lib/db";

const prisma = new PrismaClient({ adapter });
async function main() {
  await prisma.game.create({
    data: {
      name: "game-1",
    },
  });
  await prisma.game.create({
    data: {
      name: "game-2",
    },
  });
  await prisma.game.create({
    data: {
      name: "game-3",
    },
  });
  await prisma.game.create({
    data: {
      name: "game-4",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
