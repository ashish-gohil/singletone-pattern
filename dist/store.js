"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.game = exports.games = void 0;
exports.games = [];
class GameManager {
    constructor() {
        this.game = [];
        this.game = [];
    }
    static getInstance() {
        if (!GameManager.instance) {
            GameManager.instance = new GameManager();
        }
        return GameManager.instance;
    }
    addGame(id) {
        this.game.push({
            id,
            whitePlayer: "",
            blackPlayer: "",
            moves: [],
        });
    }
    addMoves(id, move) {
        const curGame = this.game.find((obj) => obj.id === id);
        curGame === null || curGame === void 0 ? void 0 : curGame.moves.push(move);
    }
    log() {
        console.log(this.game);
    }
}
exports.game = GameManager.getInstance();
