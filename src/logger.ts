import { game } from "./gameManager";

export function startLogger() {
  setInterval(() => {
    console.log(game.log());
  }, 2000);
}
