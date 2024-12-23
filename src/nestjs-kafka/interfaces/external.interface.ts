import { SchemaRegistryAPIClientArgs } from '@kafkajs/confluent-schema-registry/dist/api';
import {
  ConsumerConfig,
  EachMessagePayload as KafkaEachMessagePayload,
  KafkaConfig,
  KafkaMessage as KafkaConsumerMessage,
  Message as KafkaProducerMessage,
  ProducerConfig,
  ProducerRecord as KafkaProducerRecord,
} from 'kafkajs';

export interface KafkaModuleConfig {
  kafkaConfig: KafkaConfig;
  consumerConfig: ConsumerConfig;
  producerConfig?: ProducerConfig;
  schemaRegistryConfig?: SchemaRegistryAPIClientArgs;
}

export interface ProducerOption {
  /**
   * Default true
   */
  autoStringifyJson?: boolean;

  /**
   * If set to true, will use schema instead of json
   */
  schemaId?: number;
}

export interface ConsumerOption {
  /**
   * Default true
   */
  autoParseByJson?: boolean;

  /**
   * Default false
   * If set to true, will use schema instead of json
   */
  autoParseBySchema?: boolean;
}

type ConsumerMessage<T> = Omit<KafkaConsumerMessage, 'value'> & {
  value: T;
};

export interface EachMessagePayload<T>
  extends Omit<KafkaEachMessagePayload, 'message'> {
  message: ConsumerMessage<T>;
}

type ProducerMessage<T> = Omit<KafkaProducerMessage, 'value'> & {
  value: T;
};
export interface ProducerRecord<T>
  extends Omit<KafkaProducerRecord, 'messages'> {
  messages: ProducerMessage<T>[];
}
