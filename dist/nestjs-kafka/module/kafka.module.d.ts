import { DynamicModule } from '@nestjs/common';
import { KafkaModuleConfig } from '../interfaces/external.interface';
export declare class KafkaModule {
    static forRoot({ kafkaConfig, consumerConfig, producerConfig, schemaRegistryConfig, }: KafkaModuleConfig): Promise<DynamicModule>;
}
