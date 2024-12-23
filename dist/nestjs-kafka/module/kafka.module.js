"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var KafkaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KafkaModule = void 0;
const confluent_schema_registry_1 = require("@kafkajs/confluent-schema-registry");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const kafkajs_1 = require("kafkajs");
const data_1 = require("../data");
const consumer_service_1 = require("../services/consumer.service");
const producer_service_1 = require("../services/producer.service");
let KafkaModule = KafkaModule_1 = class KafkaModule {
    static forRoot({ kafkaConfig, consumerConfig, producerConfig, schemaRegistryConfig, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const kafka = new kafkajs_1.Kafka(kafkaConfig);
            const consumer = kafka.consumer(consumerConfig);
            const producer = kafka.producer(producerConfig);
            let registry = undefined;
            if (schemaRegistryConfig) {
                registry = new confluent_schema_registry_1.SchemaRegistry(schemaRegistryConfig);
            }
            return {
                global: true,
                module: KafkaModule_1,
                providers: [
                    {
                        provide: consumer_service_1.KafkaConsumer,
                        inject: [core_1.ModuleRef],
                        useFactory: (moduleRef) => {
                            return new consumer_service_1.KafkaConsumer(consumer, data_1.subscribeInfos, moduleRef, registry);
                        },
                    },
                    {
                        provide: producer_service_1.KafkaProducer,
                        useFactory: () => {
                            return new producer_service_1.KafkaProducer(producer, registry);
                        },
                    },
                ],
                exports: [producer_service_1.KafkaProducer],
            };
        });
    }
};
KafkaModule = KafkaModule_1 = __decorate([
    (0, common_1.Module)({})
], KafkaModule);
exports.KafkaModule = KafkaModule;
