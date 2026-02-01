import { prisma } from "@/shared/lib/db";
import { Button } from "@/shared/ui/button";
import { Card, CardTitle } from "@/shared/ui/card";
import Image from "next/image";

export default async function Home() {
  const games = await prisma.game.findMany();
  return (
    <div>
      <Button>Hello</Button>
      {games.map((game) => (
        <Card key={game.id}>
          <CardTitle>{game.name}</CardTitle>
        </Card>
      ))}
    </div>
  );
}
