import { ConsumerOption } from '../interfaces/external.interface';
export declare const SubscribeTo: (topic: string, options?: ConsumerOption) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
