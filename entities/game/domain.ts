import { GameId, UserId } from "@/kernel/ids";

export type GameEntity = GameIdleEntity | GameInPropgressEntity | GameOverEntity | GameOverDrawEntity

export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity
  field: Field
  status: 'idle'
}

export type GameInPropgressEntity = {
  id: GameId;
  players: PlayerEntity[]
  field: Field
  status: 'inProgress'
}

export type GameOverEntity = {
  id: GameId;
  players: PlayerEntity[]
  field: Field
  status: 'gameOver'
  winner: PlayerEntity
}

export type GameOverDrawEntity = {
  id: GameId;
  players: PlayerEntity[]
  field: Field
  status: 'gameOverDraw' 
}

export type PlayerEntity = {
  id: UserId;
  login: string;
  rating: number;
}

export type Field = Cell[]

export type Cell = GameSymbol | null
export type GameSymbol = string

export const GameSymbol = {
  X: "X",
  O: "O"
}

export const getGameCurrentStep = (gameInProgress: GameInPropgressEntity | GameOverEntity | GameOverDrawEntity) => {
  const symbols = gameInProgress.field.filter(Boolean).length

  return symbols % 2 === 0 ? GameSymbol.X : GameSymbol.O
}

export const getNextSymbol = (gameSymbol: GameSymbol) => {
  if(gameSymbol === GameSymbol.X) {
    return GameSymbol.O
  }

  return GameSymbol.X
}