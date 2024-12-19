interface Game {
  id: number;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export const games: Game[] = [];

class GameManager {
  private game: Game[] = [];
  private static instance: GameManager;
  constructor() {
    this.game = [];
  }
  static getInstance() {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }
  addGame(id: number) {
    this.game.push({
      id,
      whitePlayer: "",
      blackPlayer: "",
      moves: [],
    });
  }
  addMoves(id: number, move: string) {
    const curGame = this.game.find((obj) => obj.id === id);
    curGame?.moves.push(move);
  }
  log() {
    console.log(this.game);
  }
}

export const game = GameManager.getInstance();
