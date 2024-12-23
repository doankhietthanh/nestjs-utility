import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Consumer, EachMessagePayload } from 'kafkajs';
import { SubscribeInfoType } from '../data';
import { ConsumerHandler } from '../interfaces/internal.interface';
import { logService } from './log.service';

export class KafkaConsumer implements OnModuleDestroy, OnModuleInit {
  constructor(
    private consumer: Consumer,
    private subscribeInfos: SubscribeInfoType,
    private moduleRef: ModuleRef,
    private registry?: SchemaRegistry,
  ) {}

  async onModuleInit() {
    this.handleSubscribe().catch((error) =>
      console.log('error handle subscribe ', error),
    );
  }

  async handleSubscribe() {
    await this.consumer.connect();

    if (!this.subscribeInfos.size) {
      logService.warnNotSubcribeAnyTopic();
      await this.consumer.disconnect();
      return;
    }

    await this.consumer.subscribe({
      topics: [...this.subscribeInfos.keys()],
      fromBeginning: false,
    });

    await this.consumer.run({
      eachMessage: async (payload: EachMessagePayload) => {
        const subscribeInfo = this.subscribeInfos.get(
          payload.topic,
        ) as ConsumerHandler;

        if (payload.message.value) {
          if (subscribeInfo.autoParseBySchema) {
            if (!this.registry) {
              logService.errorParseBySchemaButSchemaRegistryNotfound(
                subscribeInfo.topic,
              );
            } else {
              payload.message.value = await this.registry.decode(
                payload.message.value,
              );
            }
          } else if (subscribeInfo.autoParseByJson) {
            payload.message.value = await JSON.parse(
              payload.message.value.toString(),
            );
          }
        }

        const contextInstance = await this.getContextInstance(
          subscribeInfo.context,
        );

        await subscribeInfo.handler.call(contextInstance, payload);
      },
    });

    logService.subscribeToTopics(this.subscribeInfos.keys());
    logService.consumerListening();
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
    logService.consumerDisconnected();
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private async getContextInstance(context: Function) {
    let instance = this.moduleRef.get(context, { strict: false });

    if (!instance) {
      instance = await this.moduleRef.create(instance);
      logService.warnContextHasNotBeenInstanced(context.name);
    }

    return instance;
  }
}
