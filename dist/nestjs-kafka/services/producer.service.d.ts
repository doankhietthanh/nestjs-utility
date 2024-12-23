import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Producer } from 'kafkajs';
import { ProducerOption, ProducerRecord } from '../interfaces/external.interface';
export declare class KafkaProducer implements OnModuleDestroy, OnModuleInit {
    private producer;
    private registry?;
    constructor(producer: Producer, registry?: SchemaRegistry | undefined);
    send<T = any>(record: ProducerRecord<T>, options?: ProducerOption): Promise<import("kafkajs").RecordMetadata[]>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
