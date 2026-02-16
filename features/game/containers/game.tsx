import { GameDomain } from "@/entities/game"
import { GameLayout } from "../ui/layout"
import { GamePlayers } from "../ui/players"
import { GameStatus } from "../ui/status"
import { GameField } from "../ui/field"

export const Game = ({gameId}: {gameId: string}) => {
  const game: GameDomain.GameEntity = {
    id: '1',
    players: [
      {
        id: '1',
        login: "Test",
        rating: 1000,
      },
      {
        id: '2',
        login: "Test2",
        rating: 1000,
      }
    ],
    status: 'inProgress',
    field: [null, 'X', null, null, null, 'O', null, null, null]
  }
  return (
    <GameLayout 
      players={<GamePlayers game={game} />}
      status={<GameStatus game={game}/>}
      field={<GameField game={game}/>}
    />
  )
} 