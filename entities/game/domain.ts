export type GameEntity = GameIdleEntity | GameInPropgressEntity | GameOverEntity | GameOverDrawEntity

export type GameIdleEntity = {
  id: string;
  players: PlayerEntity[]
  status: 'idle'
}

export type GameInPropgressEntity = {
  id: string;
  players: PlayerEntity[]
  field: Field
  status: 'inProgress'
}

export type GameOverEntity = {
  id: string;
  players: PlayerEntity[]
  field: Field
  status: 'gameOver'
  winner: PlayerEntity
}

export type GameOverDrawEntity = {
  id: string;
  players: PlayerEntity[]
  field: Field
  status: 'gameOverDraw' 
}

export type PlayerEntity = {
  id: string;
  login: string;
  rating: number;
}

export type Field = Cell[]

export type Cell = GameSymbol | null
export type GameSymbol = string