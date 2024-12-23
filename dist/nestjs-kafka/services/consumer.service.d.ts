import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { Consumer } from 'kafkajs';
import { SubscribeInfoType } from '../data';
export declare class KafkaConsumer implements OnModuleDestroy, OnModuleInit {
    private consumer;
    private subscribeInfos;
    private moduleRef;
    private registry?;
    constructor(consumer: Consumer, subscribeInfos: SubscribeInfoType, moduleRef: ModuleRef, registry?: SchemaRegistry | undefined);
    onModuleInit(): Promise<void>;
    handleSubscribe(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private getContextInstance;
}
