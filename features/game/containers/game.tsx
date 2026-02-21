import { getCurrentUser } from "@/entities/user/server";
import { GameClient } from "./game-client";
import { getGameById, startGame } from "@/entities/game/server";
import { gameEvents } from "../services/game-event";
import { redirect } from "next/navigation";

export const Game = async ({ gameId }: { gameId: string }) => {
  const user = await getCurrentUser();
  let game = await getGameById(gameId)

  if(!game) {
    redirect('/')
  }

  if (user) {
    const startGameResult = await startGame(gameId, user);
    if (startGameResult.type === "right") {
      game = startGameResult.value
      gameEvents.emit(startGameResult.value);
    }
  }

  return <GameClient defaultGame={game} />;
};
