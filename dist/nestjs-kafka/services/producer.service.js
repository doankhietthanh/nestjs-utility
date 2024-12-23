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
exports.KafkaProducer = void 0;
const log_service_1 = require("./log.service");
class KafkaProducer {
    constructor(producer, registry) {
        this.producer = producer;
        this.registry = registry;
    }
    send(record, options = { autoStringifyJson: true }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { schemaId, autoStringifyJson } = options;
            if (schemaId) {
                if (!this.registry) {
                    log_service_1.logService.errorSendMessageWithSchemaIdButSchemaRegistryNotFound(record.topic, schemaId);
                }
                else {
                    record.messages = yield Promise.all(record.messages.map((item) => __awaiter(this, void 0, void 0, function* () {
                        if (!this.registry)
                            return item;
                        item.value = (yield this.registry.encode(schemaId, item.value));
                        return item;
                    })));
                }
            }
            else if (autoStringifyJson) {
                record.messages = record.messages.map((item) => {
                    item.value = JSON.stringify(item.value);
                    return item;
                });
            }
            return this.producer.send(record);
        });
    }
    onModuleInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.connect();
            log_service_1.logService.producerConnected();
        });
    }
    onModuleDestroy() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.disconnect();
            log_service_1.logService.producerDisconnected();
        });
    }
}
exports.KafkaProducer = KafkaProducer;
