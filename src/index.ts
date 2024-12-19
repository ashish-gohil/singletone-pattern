// import { game } from "./gameManager";
// import { startLogger } from "./logger";

// startLogger();
import { PubSubManager } from "./pubSubManager";
const pubSubManager = PubSubManager.getInstance();

function main() {
  setInterval(() => {
    // game.addGame(1);
    // game.addMoves(1, "e2e3");
    pubSubManager.addSubscription("tcs", String(Math.random()));
    pubSubManager.addSubscription("infy", "123");
  }, 2000);

  setInterval(() => {
    pubSubManager.removeSubscription("infy", "123");
  }, 3000);
  pubSubManager.logSubscriptions();
}
main();
