import { RabbitMQqueueFormatter } from '../../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMQqueueFormatter';
import { RabbitMqConnection } from '../../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMqConnection';
import { RabbitMQEventBus } from '../../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMqEventBus';
import { RabbitMQConfig } from './RabbitMQConfigFactory';

export class RabbitMQEventBusFactory {
  static create(connection: RabbitMqConnection, queueNameFormatter: RabbitMQqueueFormatter, config: RabbitMQConfig): RabbitMQEventBus {
    return new RabbitMQEventBus({
      connection,
      exchange: config.exchangeSettings.name,
      queueNameFormatter: queueNameFormatter,
      maxRetries: config.maxRetries,
    });
  }
}
