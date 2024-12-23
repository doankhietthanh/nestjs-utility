"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaListener = void 0;
const data_1 = require("../data");
const subcribe_metadata_key_enum_1 = require("../enums/subcribe-metadata-key.enum");
const log_service_1 = require("../services/log.service");
function KafkaListener() {
    return (constructor) => {
        const target = constructor.prototype;
        for (const key of Object.getOwnPropertyNames(target)) {
            const subscribeHandler = Reflect.getMetadata(subcribe_metadata_key_enum_1.SubscribeMetadataKey.SUBSCRIBE_HANDLER, target, key);
            if (!subscribeHandler)
                continue;
            const { topic, autoParseByJson: parseByJson, autoParseBySchema: parseBySchema, } = subscribeHandler;
            log_service_1.logService.warnSubcribeTopicTwice(data_1.subscribeInfos, topic);
            data_1.subscribeInfos.set(topic, {
                context: constructor,
                handler: target[key],
                topic,
                autoParseByJson: parseByJson,
                autoParseBySchema: parseBySchema,
            });
        }
    };
}
exports.KafkaListener = KafkaListener;
