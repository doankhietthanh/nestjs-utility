"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaConsumer = void 0;
const log_service_1 = require("./log.service");
class KafkaConsumer {
    constructor(consumer, subscribeInfos, moduleRef, registry) {
        this.consumer = consumer;
        this.subscribeInfos = subscribeInfos;
        this.moduleRef = moduleRef;
        this.registry = registry;
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.handleSubscribe().catch((error) => console.log('error handle subscribe ', error));
        });
    }
    handleSubscribe() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.connect();
            if (!this.subscribeInfos.size) {
                log_service_1.logService.warnNotSubcribeAnyTopic();
                yield this.consumer.disconnect();
                return;
            }
            yield this.consumer.subscribe({
                topics: [...this.subscribeInfos.keys()],
                fromBeginning: false,
            });
            yield this.consumer.run({
                eachMessage: (payload) => __awaiter(this, void 0, void 0, function* () {
                    const subscribeInfo = this.subscribeInfos.get(payload.topic);
                    if (payload.message.value) {
                        if (subscribeInfo.autoParseBySchema) {
                            if (!this.registry) {
                                log_service_1.logService.errorParseBySchemaButSchemaRegistryNotfound(subscribeInfo.topic);
                            }
                            else {
                                payload.message.value = yield this.registry.decode(payload.message.value);
                            }
                        }
                        else if (subscribeInfo.autoParseByJson) {
                            payload.message.value = yield JSON.parse(payload.message.value.toString());
                        }
                    }
                    const contextInstance = yield this.getContextInstance(subscribeInfo.context);
                    yield subscribeInfo.handler.call(contextInstance, payload);
                }),
            });
            log_service_1.logService.subscribeToTopics(this.subscribeInfos.keys());
            log_service_1.logService.consumerListening();
        });
    }
    onModuleDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.disconnect();
            log_service_1.logService.consumerDisconnected();
        });
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    getContextInstance(context) {
        return __awaiter(this, void 0, void 0, function* () {
            let instance = this.moduleRef.get(context, { strict: false });
            if (!instance) {
                instance = yield this.moduleRef.create(instance);
                log_service_1.logService.warnContextHasNotBeenInstanced(context.name);
            }
            return instance;
        });
    }
}
exports.KafkaConsumer = KafkaConsumer;
