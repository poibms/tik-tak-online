import { prisma } from "@/shared/lib/db";
import {
  GameEntity,
  GameIdleEntity,
  GameOverEntity,
} from "../domain";
import { Game, Prisma, User } from "@/app/generated/prisma/client";
import { z } from "zod";
import { removePasssword } from "@/shared/lib/password";

async function gamesList(where: Prisma.GameWhereInput): Promise<GameEntity[]> {
  const games = await prisma.game.findMany({
    where,
    include: { players: true, winner: true },
  });
  return games.map(dbGameToGameEntity);
}

const fieldSchema = z.array(z.union([z.string(), z.null()]));


async function createGame(game: GameIdleEntity): Promise<GameEntity> {
   const createdGame = await prisma.game.create({
    data: {
      status: game.status,
      id: game.id,
      field: Array(9).fill(null),
      players: {
        connect: {id: game.creator.id}
      },
    },
    include: {
      players: true,
      winner: true
    }
   })

   return dbGameToGameEntity(createdGame)
}

function dbGameToGameEntity(
  game: Game & { players: User[]; winner?: User | null },
): GameEntity {
  const players = game.players.map(removePasssword);

  switch (game.status) {
    case "idle": {
      const [creator] = players;
      if (!creator) {
        throw new Error("creator should be in game idle");
      }
      return {
        id: game.id,
        creator,
        status: game.status,
      } satisfies GameIdleEntity;
    }
    case "inProgress":
    case "gameOverDraw":
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
      };
    case "gameOver": {
      if (!game.winner) {
        throw new Error("winner should be in game over");
      }
      return {
        id: game.id,
        players: players,
        status: game.status,
        field: fieldSchema.parse(game.field),
        winner: removePasssword(game.winner),
      } satisfies GameOverEntity;
    }
  }
}

export const gameRepository = {
  gamesList,
  createGame
};
