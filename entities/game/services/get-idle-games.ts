import { GameIdleEntity } from "../domain"
import { gameRepository } from "../repositories/game"

export const getIdleGames = async(): Promise<GameIdleEntity[]> => {
  const gamesList = await gameRepository.gamesList({
    status: 'idle'
  })
  
  return gamesList as GameIdleEntity[]
}