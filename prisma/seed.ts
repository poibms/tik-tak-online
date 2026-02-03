import { PrismaClient } from "@/app/generated/prisma/client";
import { adapter } from "@/shared/lib/db";

const prisma = new PrismaClient({ adapter });
async function main() {
  const user = await prisma.user.create({
    data: {
      login: 'user',
      passwordHash: 'safasf',
      rating: 1000
    }
  })
  const user2 = await prisma.user.create({
    data: {
      login: 'user2',
      passwordHash: 'safasf',
      rating: 800
    }
  })
  // await prisma.game.create({
  //   data: {
  //     status: 'idle',
  //     field: Array(9).fill(null),
  //     players: {
  //       connect: {
  //         id: user.id
  //       }
  //     }
  //   },
  // });
  // await prisma.game.create({ 
  //   data: {
  //     status: 'idle',
  //     field: Array(9).fill(null),
  //     players: {
  //       connect: {
  //         id: user2.id
  //       }
  //     }
  //   },
  // });
  
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
