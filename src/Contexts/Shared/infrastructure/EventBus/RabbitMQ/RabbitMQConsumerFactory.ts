import { DomainEvent } from '../../../domain/DomainEvent';
import { DomainEventSubscriber } from '../../../domain/DomainEventSuscriber';
import { DomainEventDeserializer } from '../DomainEventDeserializer';
import { RabbitMqConnection } from './RabbitMqConnection';
import { RabbitMQConsumer } from './RabbitMQConsumer';

export class RabbitMQConsumerFactory {
  constructor(
    private deserializer: DomainEventDeserializer,
    private connection: RabbitMqConnection,
    private maxRetries: Number,
  ) {}

  build(subscriber: DomainEventSubscriber<DomainEvent>, exchange: string, queueName: string) {
    console.log('subscriber: ', subscriber);
    console.log('exchange: ', exchange);
    console.log('queue name', queueName);
    return new RabbitMQConsumer({
      subscriber,
      deserializer: this.deserializer,
      connection: this.connection,
      queueName,
      exchange,
      maxRetries: this.maxRetries,
    });
  }
}
