import { createClient, RedisClientType } from "redis";
export class PubSubManager {
  private redisClient: RedisClientType;
  private subscriptions: Map<string, string[]>; // type is map, where key is stock name and value is array of userIds
  private static instance: PubSubManager;
  constructor() {
    this.redisClient = createClient();
    this.redisClient.connect();
    this.subscriptions = new Map();
  }
  static getInstance() {
    if (!PubSubManager.instance) {
      PubSubManager.instance = new PubSubManager();
    }
    return PubSubManager.instance;
  }
  addSubscription(stock: string, userId: string) {
    console.log(`Subscribe: ${stock} for userId: ${userId}`);
    if (!this.subscriptions.has(stock)) {
      this.subscriptions.set(stock, []);
      this.redisClient.subscribe(stock, (message) => {
        this.logger(stock, message);
      });
    }
    this.subscriptions.get(stock)?.push(userId);
  }
  removeSubscription(stock: string, userId: string) {
    console.log(`Un-Subscribe: ${stock} for userId: ${userId}`);
    const newSubscription =
      this.subscriptions.get(stock)?.filter((users) => users !== userId) || [];
    this.subscriptions.set(stock, newSubscription);
    if (newSubscription.length === 0) {
      this.redisClient.unsubscribe(stock, (message) => {
        this.logger(stock, message);
      });
    }
  }
  logger(stock: string, message: string) {
    console.log(stock);
    console.log(message);
  }
  logSubscriptions() {
    console.log(this.subscriptions);
  }
}
