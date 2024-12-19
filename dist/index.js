"use strict";
// import { game } from "./store";
// import { startLogger } from "./logger";
Object.defineProperty(exports, "__esModule", { value: true });
// startLogger();
const pubSubManager_1 = require("./pubSubManager");
const pubSubManager = pubSubManager_1.PubSubManager.getInstance();
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
