import { GameId, UserId } from "@/kernel/ids";

export type GameEntity = GameIdleEntity | GameInPropgressEntity | GameOverEntity | GameOverDrawEntity

export type GameIdleEntity = {
  id: GameId;
  creator: PlayerEntity
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