"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logService = exports.LogService = void 0;
const common_1 = require("@nestjs/common");
class LogService {
    constructor() {
        this.logger = new common_1.Logger('KafakaModule');
    }
    warnSubcribeTopicTwice(container, topic) {
        if (container.has(topic))
            this.logger.warn(`Listen twice of topic ${topic}`);
    }
    warnNotSubcribeAnyTopic() {
        this.logger.warn(`You did not subscribe to any topic, auto disconnect`);
    }
    warnContextHasNotBeenInstanced(name) {
        this.logger.warn(`Dependency ${name} has not been instantiated, auto instantiate it`);
    }
    errorParseBySchemaButSchemaRegistryNotfound(topic) {
        this.logger.error(`Subscribe to ${topic} and parse by schema but schema registry not found`);
    }
    errorSendMessageWithSchemaIdButSchemaRegistryNotFound(topic, schemaId) {
        this.logger.error(`Send message to ${topic} with schemaID: ${schemaId} but schema registry not found`);
    }
    subscribeToTopics(topics) {
        for (const topic of topics) {
            this.logger.log(`Subscribe to topic ${topic}`);
        }
    }
    consumerListening() {
        this.logger.log('Consumer is listening . . .');
    }
    consumerDisconnected() {
        this.logger.log('Consumer has disconnected successfully');
    }
    producerConnected() {
        this.logger.log('Producer is connected');
    }
    producerDisconnected() {
        this.logger.log('Producer has disconnected successfully');
    }
}
exports.LogService = LogService;
exports.logService = new LogService();
