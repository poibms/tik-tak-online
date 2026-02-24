import { GameDomain } from "@/entities/game";

export function GameStatus({ game }: { game: GameDomain.GameEntity }) {
  switch (game.status) {
    case "idle":
      return (
        <div>Waiting for user...</div>
      );
    case "inProgress": {
      const currSymbol = GameDomain.getCurrentSymbol(game)
      return (
        <div>Turn: {currSymbol}</div>
      );
    }
    case "gameOver": {
      const currSymbol = GameDomain.getCurrentSymbol(game)
      return ( 
        <div>Winner: {currSymbol}</div>
      );
    }
    case "gameOverDraw": 
      return (
        <div>Draw</div>
      );
  }
  
}