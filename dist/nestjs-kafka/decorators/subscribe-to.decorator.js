"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscribeTo = void 0;
const subcribe_metadata_key_enum_1 = require("../enums/subcribe-metadata-key.enum");
const SubscribeTo = (topic, options = { autoParseByJson: true }) => {
    return function (target, propertyKey, descriptor) {
        const payload = Object.assign(Object.assign({}, options), { topic });
        Reflect.defineMetadata(subcribe_metadata_key_enum_1.SubscribeMetadataKey.SUBSCRIBE_HANDLER, payload, target, propertyKey);
    };
};
exports.SubscribeTo = SubscribeTo;
