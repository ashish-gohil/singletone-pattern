"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PubSubManager = void 0;
const redis_1 = require("redis");
class PubSubManager {
    constructor() {
        this.redisClient = (0, redis_1.createClient)();
        this.redisClient.connect();
        this.subscriptions = new Map();
    }
    static getInstance() {
        if (!PubSubManager.instance) {
            PubSubManager.instance = new PubSubManager();
        }
        return PubSubManager.instance;
    }
    addSubscription(stock, userId) {
        var _a;
        console.log(`Subscribe: ${stock} for userId: ${userId}`);
        if (!this.subscriptions.has(stock)) {
            this.subscriptions.set(stock, []);
            this.redisClient.subscribe(stock, (message) => {
                this.logger(stock, message);
            });
        }
        (_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.push(userId);
    }
    removeSubscription(stock, userId) {
        var _a;
        console.log(`Un-Subscribe: ${stock} for userId: ${userId}`);
        const newSubscription = ((_a = this.subscriptions.get(stock)) === null || _a === void 0 ? void 0 : _a.filter((users) => users !== userId)) || [];
        this.subscriptions.set(stock, newSubscription);
        if (newSubscription.length === 0) {
            this.redisClient.unsubscribe(stock, (message) => {
                this.logger(stock, message);
            });
        }
    }
    logger(stock, message) {
        console.log(stock);
        console.log(message);
    }
    logSubscriptions() {
        console.log(this.subscriptions);
    }
}
exports.PubSubManager = PubSubManager;
