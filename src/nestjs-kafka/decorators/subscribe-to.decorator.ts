import { SubscribeMetadataKey } from '../enums/subcribe-metadata-key.enum';
import { ConsumerOption } from '../interfaces/external.interface';
import { SubscribeHandler } from '../interfaces/internal.interface';

export const SubscribeTo = (
  topic: string,
  options: ConsumerOption = { autoParseByJson: true },
) => {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const payload: SubscribeHandler = {
      ...options,
      topic,
    };

    Reflect.defineMetadata(
      SubscribeMetadataKey.SUBSCRIBE_HANDLER,
      payload,
      target,
      propertyKey,
    );
  };
};
