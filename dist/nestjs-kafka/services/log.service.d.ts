import { Logger } from '@nestjs/common';
export declare class LogService {
    logger: Logger;
    warnSubcribeTopicTwice(container: Map<string, any>, topic: string): void;
    warnNotSubcribeAnyTopic(): void;
    warnContextHasNotBeenInstanced(name: string): void;
    errorParseBySchemaButSchemaRegistryNotfound(topic: string): void;
    errorSendMessageWithSchemaIdButSchemaRegistryNotFound(topic: string, schemaId: number): void;
    subscribeToTopics(topics: Iterable<string>): void;
    consumerListening(): void;
    consumerDisconnected(): void;
    producerConnected(): void;
    producerDisconnected(): void;
}
export declare const logService: LogService;
